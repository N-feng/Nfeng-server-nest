import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsColor as GoodsColorModel } from '../../model/goods_color.model';
import { CreateGoodsColorDto } from './dto/goods_color.dto';

@Injectable()
export class GoodsColorService {
  constructor(@InjectModel(GoodsColorModel) private readonly goodsColorModel: ModelType<GoodsColorModel>) {}

  async find(body?) {
    return await this.goodsColorModel.find(body)
  }

  async findOne(id) {
    return await this.goodsColorModel.findById(id)
  }

  async create(body: CreateGoodsColorDto) {
    await this.goodsColorModel.create(body)
  }

  async update(id: string, body: CreateGoodsColorDto) {
    return await this.goodsColorModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsColorModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsColorModel
  }
}
