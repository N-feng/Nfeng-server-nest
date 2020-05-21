import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsCate as GoodsCateModel } from '../../model/goods_cate.model';
import { CreateGoodsCateDto } from './dto/goods_cate.dto';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Injectable()
export class GoodsCateService {
  constructor(@InjectModel(GoodsCateModel) private readonly goodsCateModel: ModelType<GoodsCateModel>) {}

  async find(body?) {
    return await this.goodsCateModel.find(body)
  }

  async findOne(id) {
    return await this.goodsCateModel.findById(id)
  }

  async create(body: CreateGoodsCateDto) {
    const pid = body.pid != '0' ? ObjectId(body.pid) : body.pid
    await this.goodsCateModel.create({...body, pid })
  }

  async update(id: string, body: CreateGoodsCateDto) {
    const pid = body.pid != '0' ? ObjectId(body.pid) : body.pid
    return await this.goodsCateModel.findByIdAndUpdate({_id: id}, {...body, pid})
  }

  async delete(id: string) {
    await this.goodsCateModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsCateModel
  }
}
