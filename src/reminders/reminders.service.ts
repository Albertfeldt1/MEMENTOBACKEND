import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EventReminder } from "src/event/entities/event-reminder.schema";

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(EventReminder.name) private reminderModel: Model<EventReminder>
  ) {}

  async createEventReminders(eventId, userId, eventDate) {
    const reminders = [
      {
        label: "1_DAY_BEFORE",
        fireAt: new Date(eventDate.getTime() - 86400000),
      },
      {
        label: "1_HOUR_BEFORE",
        fireAt: new Date(eventDate.getTime() - 3600000),
      },
      {
        label: "15_MIN_BEFORE",
        fireAt: new Date(eventDate.getTime() - 900000),
      },
      { label: "ON_EVENT", fireAt: eventDate },
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
      .find({
        fireAt: { $lte: new Date() },
        isSent: false,
      })
      .populate("eventId")
      .populate("userId");
  }

  async markAsSent(id: string) {
    return this.reminderModel.updateOne({ _id: id }, { isSent: true });
  }
}
