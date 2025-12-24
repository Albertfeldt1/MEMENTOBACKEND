import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateEventDto) {
    return this.eventService.create(req.user.userId, dto);
  }

  // GET ALL
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.eventService.findAll(req.user.userId);
  }

  // GET BY ID
  @UseGuards(JwtAuthGuard)
  @Get("get-event-details")
  findById(@Request() req, @Query("id") id: string) {
    return this.eventService.findById(req.user.userId, id);
  }

  // UPDATE EVENT
  @UseGuards(JwtAuthGuard)
  @Patch("update-event")
  updateEvent(
    @Request() req,
    @Query("id") id: string,
    @Body() dto: UpdateEventDto
  ) {
    return this.eventService.updateEvent(req.user.userId, id, dto);
  }

  // DELETE EVENT
  @UseGuards(JwtAuthGuard)
  @Delete("delete-event")
  deleteEvent(@Request() req, @Query("id") id: string) {
    return this.eventService.deleteEvent(req.user.userId, id);
  }

  // UPDATE
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  // DELETE
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.eventService.delete(id);
  }
}
