import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Access as AccessModel } from 'src/model/access.model';
// import { CreateAccessDto } from 'src/dto/access.dto'
import * as mongoose from 'mongoose';

@Injectable()
export class AccessService {
  constructor(@InjectModel(AccessModel) private readonly accessModel: ModelType<AccessModel>) {}

  async find(body) {
    return await this.accessModel.find(body)
  }

  async findOne(id) {
    return await this.accessModel.findById(id)
  }

  async create(body) {
    const { moduleId } = body
    if(moduleId!='0') {
      body.moduleId = mongoose.Types.ObjectId(moduleId)
    }
    await this.accessModel.create(body)
  }

  async update(id, body) {
    const { moduleId } = body
    if(moduleId!='0') {
      body.moduleId = mongoose.Types.ObjectId(moduleId)
    }
    await this.accessModel.findByIdAndUpdate(id, body)
  }

  async delete(id) {
    await this.accessModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.accessModel
  }
}
