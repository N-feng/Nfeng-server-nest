import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsType as GoodsTypeModel } from '../../model/goods_type.model';
import { CreateGoodsTypeDto } from './dto/goods_type.dto';

@Injectable()
export class GoodsTypeService {
  constructor(@InjectModel(GoodsTypeModel) private readonly goodsTypeModel: ModelType<GoodsTypeModel>) {}

  async find(body?) {
    return await this.goodsTypeModel.find(body)
  }

  async create(body: CreateGoodsTypeDto) {
    await this.goodsTypeModel.create(body)
  }

  async update(id: string, body: CreateGoodsTypeDto) {
    return await this.goodsTypeModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsTypeModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsTypeModel
  }
}
