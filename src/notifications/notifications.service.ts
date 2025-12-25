import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';

@Injectable()
export class NotificationsServices {
  constructor(
    @InjectModel(Notification.name)
    private NotificationModel: Model<Notification>,
  ) {}
  async create(createNotificationDto: any) {
    const response = await this.NotificationModel.create(createNotificationDto);
    return response;
  }

  async bulkCreate(bulkData: any) {
    const response = await this.NotificationModel.insertMany(bulkData);
    return response;
  }

  async deleteManyForUser( ids: string[]) {
    if (!ids || ids.length === 0) {
      return { requested: 0, deletedCount: 0, deletedIds: [] };
    }
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const matched = await this.NotificationModel
      .find(
        { _id: { $in: objectIds } },
      )
      .lean();

    if (!matched || matched.length === 0) {
      return { requested: ids.length, deletedCount: 0, deletedIds: [] };
    }
    const matchedIds = matched.map((m) => m._id);
    const res = await this.NotificationModel.deleteMany({
      _id: { $in: matchedIds },
    });
    return {
      statusCode:200,
      message:'Notification deleted successfully',
      data:{
      requested: ids.length,
      deletedCount: res.deletedCount ?? 0,
      deletedIds: matchedIds.map((id) => id.toString()),
      }
    };
  }

  async findAll(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const data = await this.NotificationModel.find({
      userId: userObjectId,
    }).sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Fetched all notifications of a user',
      data,
    };
  }

  async getAllForAdmin(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const notifications = await this.NotificationModel.find()
      .populate({
        path: 'userId',
        select: 'name email mobileNumber image userType',
      })
      .populate({
        path: 'bookingId',
        select: 'serviceType bookingStatus createdAt',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await this.NotificationModel.countDocuments();

    return {
      statusCode: 200,
      message: 'Fetched all notifications for admin',
      data: notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  async markAsRead(
    userId: string,
    notificationId?: string,
    notificationIds?: string[],
  ) {
    if (notificationId) {
      const notification = await this.NotificationModel.findOneAndUpdate(
        { _id: new Types.ObjectId(notificationId), userId },
        { $set: { isRead: true } },
        { new: true },
      );
      if (!notification) throw new NotFoundException('Notification not found');
      return {
        success: true,
        message: 'Notification marked as read successfully.',
        data: notification,
      };
    }
    if (notificationIds && notificationIds.length > 0) {
      const objectIds = notificationIds.map((id) => new Types.ObjectId(id));
      const userObjectId = new Types.ObjectId(userId);
      const result = await this.NotificationModel.updateMany(
        { _id: { $in: objectIds }, userId: userObjectId },
        { $set: { isRead: true } },
      );
      return {
        success: true,
        message: `${result.modifiedCount} notifications marked as read.`,
        data: [],
      };
    }

    const result = await this.NotificationModel.updateMany(
      { userId: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true } },
    );

    return {
      success: true,
      message: `${result.modifiedCount} notifications marked as read.`,
      data: [],
    };
  }
}
