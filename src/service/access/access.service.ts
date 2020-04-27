import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Access as AccessModel } from '../../model/access.model';
import { CreateAccessDto } from '../../dto/access.dto'
import * as mongoose from 'mongoose';

@Injectable()
export class AccessService {
  constructor(@InjectModel(AccessModel) private readonly accessModel: ModelType<AccessModel>) {}

  async find(body) {
    return await this.accessModel.find(body)
  }

  async create(body) {
    const { module_id } = body
    if(module_id!='0') {
      body.module_id = mongoose.Types.ObjectId(module_id)
    }
    await this.accessModel.create(body)
  }

  async update(id, body: CreateAccessDto) {
    await this.accessModel.findByIdAndUpdate(id, body)
  }

  async delete(id) {
    await this.accessModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.accessModel
  }
}
