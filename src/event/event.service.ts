import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { I18nService } from "nestjs-i18n";

import { Event, EventDocument } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

import { DateTime } from "luxon";
import { User } from "src/users/user.schema";
import { RemindersService } from "src/reminders/reminders.service";
// import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly i18n: I18nService,
    // private notificationsService: NotificationsService,
    private readonly remindersService: RemindersService
  ) {}

  async create(userId: string, dto: CreateEventDto) {
    const user = await this.userModel.findById(userId);

    if (!user || !user.timezone) {
      throw new NotFoundException("User or timezone not found");
    }

    // Combine date + time in USER timezone
    const userDateTime = DateTime.fromISO(
      `${dto.date}T${dto.time}`,
      { zone: user.timezone } // 🔥 user timezone
    );

    // Convert to UTC before saving
    const utcDate = userDateTime.toUTC().toJSDate();

    const event = await this.eventModel.create({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      image: dto.image,
      date: utcDate, // ✅ always UTC
      time: dto.time,
      location: dto.location,
    });

    // Notifications
    // if (user.device_token) {
    //   await this.notificationsService.sendPushNotification(
    //     user.device_token,
    //     "Event Scheduled Successfully",
    //     "Your event has been created successfully. We'll notify you before it begins."
    //   );
    // }

    await this.notificationModel.create({
      userId: new Types.ObjectId(userId),
      title: "Event Scheduled Successfully",
      message:
        "Your event has been created successfully. We’ll notify you before it begins.",
    });

    // Create reminders in UTC
    await this.remindersService.createEventReminders(
      event._id,
      userId,
      utcDate
    );

    return {
      statusCode: 200,
      message: "Event created successfully",
      data: event,
    };
  }

  async findAll(userId: string) {
    const data = await this.eventModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate("userId", "-password")
      .sort({ createdAt: -1 });

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.EVENTS_FETCHED"),
      data,
    };
  }

  async findById(userId: string, eventId: string) {
    const event = await this.eventModel
      .findOne({
        _id: new Types.ObjectId(eventId),
        userId: new Types.ObjectId(userId),
      })
      .populate("userId", "-password");

    if (!event) {
      throw new NotFoundException(
        await this.i18n.translate("common.EVENT_NOT_FOUND")
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.EVENT_DETAILS_FETCHED"),
      data: event,
    };
  }

  // UPDATE
  async update(id: string, dto: UpdateEventDto) {
    const event = await this.eventModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!event) {
      throw new NotFoundException(
        await this.i18n.translate("common.EVENT_NOT_FOUND")
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.DATA_FETCHED"),
      data: event,
    };
  }

  // DELETE
  async delete(id: string) {
    const event = await this.eventModel.findByIdAndDelete(id);

    if (!event) {
      throw new NotFoundException(
        await this.i18n.translate("common.EVENT_NOT_FOUND")
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.EVENT_DELETED"),
    };
  }

  // UPDATE EVENT
  async updateEvent(userId: string, eventId: string, dto: UpdateEventDto) {
    const event = await this.eventModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(eventId),
        userId: new Types.ObjectId(userId),
      },
      {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
      { new: true }
    );

    if (!event) {
      throw new NotFoundException(
        await this.i18n.translate("common.EVENT_NOT_FOUND")
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.EVENT_UPDATED"),
      data: event,
    };
  }

  // DELETE EVENT
  async deleteEvent(userId: string, eventId: string) {
    const event = await this.eventModel.findOneAndDelete({
      _id: new Types.ObjectId(eventId),
      userId: new Types.ObjectId(userId),
    });

    if (!event) {
      throw new NotFoundException(
        await this.i18n.translate("common.EVENT_NOT_FOUND")
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: await this.i18n.translate("common.EVENT_DELETED"),
      data: [],
    };
  }
}
