import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Goods as GoodsModel } from '../../model/goods.model';
import { CreateGoodsDto } from './dto/goods.dto';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(GoodsModel) private readonly goodsModel: ModelType<GoodsModel>) {}

  async find(body?, skip = 0, limit = 0, fields?: string) {
    return await this.goodsModel.find(body, fields).skip(skip).limit(limit)
  }

  async count(body?) {
    return await this.goodsModel.find(body).count()
  }

  async findOne(id) {
    return await this.goodsModel.findById(id)
  }

  async create(body: CreateGoodsDto) {
    return await this.goodsModel.create(body)
  }

  async update(id: string, body: CreateGoodsDto) {
    return await this.goodsModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsModel
  }
}
