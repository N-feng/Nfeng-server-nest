import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Goods as GoodsModel } from '../../model/goods.model';
import { CreateGoodsDto } from '../../dto/goods.dto';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Injectable()
export class GoodsService {
  constructor(@InjectModel(GoodsModel) private readonly goodsModel: ModelType<GoodsModel>) {}

  async find(body?) {
    return await this.goodsModel.find(body)
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
