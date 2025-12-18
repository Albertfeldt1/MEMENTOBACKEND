import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Event, EventDocument } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>
  ) {}

  // CREATE
  async create(userId: string, dto: CreateEventDto) {
    const data = await this.eventModel.create({
      userId: new Types.ObjectId(userId),
      ...dto,
      date: new Date(dto.date),
    });
    const response = {
      statusCode: HttpStatus.OK,
      message: "Event created successfully",
      data,
    };
    return response;
  }

  // GET ALL
  async findAll(userId: string) {
    const data = await this.eventModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate("userId", "-password")
      .sort({ createdAt: -1 });
    const response = {
      statusCode: HttpStatus.OK,
      message: "All events fetched successfully",
      data,
    };
    return response;
  }

  // GET BY ID
  async findById(userId: string, eventId: string) {
    const event = await this.eventModel
      .findOne({
        _id: new Types.ObjectId(eventId),
        userId: new Types.ObjectId(userId),
      })
      .populate("userId", "-password");

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Event details fetched successfully",
      data: event,
    };
  }

  // UPDATE
  async update(id: string, dto: UpdateEventDto) {
    const event = await this.eventModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!event) throw new NotFoundException("Event not found");
    return event;
  }

  // DELETE
  async delete(id: string) {
    const event = await this.eventModel.findByIdAndDelete(id);
    if (!event) throw new NotFoundException("Event not found");
    return { message: "Event deleted successfully" };
  }
}
