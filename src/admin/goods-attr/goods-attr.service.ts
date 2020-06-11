import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsAttr as GoodsAttrModel } from '../../model/goods_attr.model';
import { CreateGoodsAttrDto } from './dto/goods_attr.dto';

@Injectable()
export class GoodsAttrService {
  constructor(@InjectModel(GoodsAttrModel) private readonly goodsAttrModel: ModelType<GoodsAttrModel>) {}

  async find(body?) {
    return await this.goodsAttrModel.find(body)
  }

  async create(body: CreateGoodsAttrDto) {
    await this.goodsAttrModel.create(body)
  }

  async update(id: string, body: CreateGoodsAttrDto) {
    return await this.goodsAttrModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsAttrModel.findByIdAndDelete(id)
  }

  async deleteMany(body) {
    return await this.goodsAttrModel.deleteMany(body)
  }

  getModel() {
    return this.goodsAttrModel
  }
}
