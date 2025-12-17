import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event,EventDocument } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
  ) {}

  // CREATE
  async create(dto: CreateEventDto) {
    return this.eventModel.create({
      ...dto,
      date: new Date(dto.date),
    });
  }

  // GET ALL
  async findAll() {
    return this.eventModel.find().sort({ createdAt: -1 });
  }

  // GET BY ID
  async findById(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // UPDATE
  async update(id: string, dto: UpdateEventDto) {
    const event = await this.eventModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // DELETE
  async delete(id: string) {
    const event = await this.eventModel.findByIdAndDelete(id);
    if (!event) throw new NotFoundException('Event not found');
    return { message: 'Event deleted successfully' };
  }
}
