import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventService } from "./event.service";
import { JwtModule } from "@nestjs/jwt";

import { EventController } from "./event.controller";
import { Event, EventSchema } from "./entities/event.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "360d" },
    }), 
  ],

  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
