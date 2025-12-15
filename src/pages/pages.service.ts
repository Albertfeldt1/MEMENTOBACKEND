import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const page = new this.pageModel(createPageDto);
    const savedPage = await page.save();
    return {
      statusCode: 201,
      message: 'Page created successfully',
      data: savedPage,
    };
  }

  async findAll() {
    const pages = await this.pageModel.find().sort({ createdAt: 1 });
    return {
      statusCode: 200,
      message: 'All pages fetched successfully',
      data: pages,
    };
  }

  async findByType(type: string) {
    const page = await this.pageModel.findOne({ type });
    if (!page) throw new NotFoundException(`Page with type '${type}' not found`);
    return {
      statusCode: 200,
      message: 'Page fetched successfully',
      data: page,
    };
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    const updatedPage = await this.pageModel.findByIdAndUpdate(
      id,
      { $set: updatePageDto },
      { new: true },
    );
    if (!updatedPage) throw new NotFoundException('Page not found');
    return {
      statusCode: 200,
      message: 'Page updated successfully',
      data: updatedPage,
    };
  }

  async remove(id: string) {
    const deletedPage = await this.pageModel.findByIdAndDelete(id);
    if (!deletedPage) throw new NotFoundException('Page not found');
    return {
      statusCode: 200,
      message: 'Page deleted successfully',
    };
  }
}
