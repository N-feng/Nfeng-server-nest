import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsImage as GoodsImageModel } from '../../model/goods_image.model';
import { CreateGoodsImageDto } from './dto/goods_image.dto';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Injectable()
export class GoodsImageService {
  constructor(@InjectModel(GoodsImageModel) private readonly goodsImageModel: ModelType<GoodsImageModel>) {}

  async find(body?) {
    return await this.goodsImageModel.find(body)
  }

  async create(body: CreateGoodsImageDto) {
    await this.goodsImageModel.create(body)
  }

  async update(id: string, body: CreateGoodsImageDto) {
    return await this.goodsImageModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsImageModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsImageModel
  }
}
