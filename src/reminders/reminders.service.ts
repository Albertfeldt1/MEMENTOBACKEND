import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EventReminder } from "src/event/entities/event-reminder.schema";

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(EventReminder.name) private reminderModel: Model<EventReminder>
  ) {}

  async createEventReminders(eventId, userId, eventDate: Date) {
    const reminders = [
      {
        label: "1_DAY_BEFORE",
        fireAt: new Date(eventDate.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        label: "1_HOUR_BEFORE",
        fireAt: new Date(eventDate.getTime() - 60 * 60 * 1000),
      },
      {
        label: "15_MIN_BEFORE",
        fireAt: new Date(eventDate.getTime() - 15 * 60 * 1000),
      },
      {
        label: "ON_EVENT",
        fireAt: eventDate,
      },
    ];

    return this.reminderModel.insertMany(
      reminders.map((r) => ({
        eventId,
        userId,
        type: r.label,
        fireAt: r.fireAt,
        isSent: false,
      }))
    );
  }

  async getDueReminders() {
    return this.reminderModel
      .findOneAndUpdate(
        {
          fireAt: { $lte: new Date() },
          isSent: false,
          isProcessing: false,
        },
        {
          $set: { isProcessing: true },
        },
        {
          new: true,
        }
      )
      .populate("eventId userId");
  }

  async markAsSent(id: string) {
    return this.reminderModel.updateOne({ _id: id }, { isSent: true });
  }
}
