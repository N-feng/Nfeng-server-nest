import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Focus as FocusModel } from '../../model/focus.model';
import { CreateFocusDto } from './dto/focus.dto';

@Injectable()
export class FocusService {
  constructor(@InjectModel(FocusModel) private readonly focusModel: ModelType<FocusModel>) {}

  async find(body) {
    return await this.focusModel.find(body)
  }

  async findOne(id) {
    return await this.focusModel.findById(id)
  }

  async create(body: CreateFocusDto) {
    await this.focusModel.create(body)
  }

  async update(id: string, body: CreateFocusDto) {
    return await this.focusModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.focusModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.focusModel
  }
}
