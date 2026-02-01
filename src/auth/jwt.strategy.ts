import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use Supabase JWT secret from environment variable
      secretOrKey: process.env.SUPABASE_JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    // Supabase JWT payload contains:
    // - sub: Supabase user ID (UUID)
    // - email: user's email
    // - aud: "authenticated"
    // - role: "authenticated"
    
    // Legacy tokens contain:
    // - sub: MongoDB user ID
    // - email: user's email
    // - loginType: "email" | "social"
    
    const email = payload.email;
    const supabaseUserId = payload.sub;
    const isSupabaseToken = payload.aud === 'authenticated';
    
    if (!email) {
      throw new UnauthorizedException('Invalid token: no email found');
    }

    // Find user by email
    let user = await this.userModel.findOne({ 
      email: email.toLowerCase() 
    }).select('-password -__v');

    // If user doesn't exist and this is a Supabase token, auto-provision the user
    if (!user && isSupabaseToken) {
      user = await this.userModel.create({
        email: email.toLowerCase(),
        name: payload.user_metadata?.full_name || payload.user_metadata?.name || '',
        supabaseId: supabaseUserId,
        // No password for Supabase-provisioned users
      });
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update supabaseId if not set (for existing users migrating to Supabase)
    if (isSupabaseToken && !user.supabaseId) {
      user.supabaseId = supabaseUserId;
      await user.save();
    }

    // Return the user ID for use in controllers
    return { 
      userId: user._id.toString(),
      email: user.email,
      supabaseId: supabaseUserId,
    };
  }
}
