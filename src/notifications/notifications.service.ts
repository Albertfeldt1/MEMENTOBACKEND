import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class NotificationsServices {
   constructor(
      @InjectModel(Notification.name) private NotificationModel: Model<Notification>, 
    ) {}
  async create(createNotificationDto: any) {
    const response = await this.NotificationModel.create(createNotificationDto)
    return response;
  }

  async bulkCreate(bulkData :any){
    const response = await this.NotificationModel.insertMany(bulkData)
    return response
  }

  async findAll(userId:string) {
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const data = await this.NotificationModel.find({userId:userObjectId}).sort({createdAt:-1})
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Fetched all notifications of a user',
        data,
      };
    return `This action returns all notifications`;
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
}
