import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import * as mongoose from 'mongoose';
import { Access as AccessSchema } from './model/access.model';

@Injectable()
export class AccessService {
  constructor(@InjectModel(AccessSchema) private readonly accessModel: ModelType<AccessSchema>) {}

  async findAll() {
    return await this.accessModel.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      {
        $match: {
          module_id: '0'
        }
      }
    ])
  }

  async create(body) {
    const { module_id } = body
    if(module_id!='0') {
      body.module_id = mongoose.Types.ObjectId(module_id)
    }
    await this.accessModel.create(body)
  }

  async update(id, body) {
    await this.accessModel.findByIdAndUpdate(id, body)
  }

  async delete(id) {
    await this.accessModel.findByIdAndDelete(id)
  }
}
