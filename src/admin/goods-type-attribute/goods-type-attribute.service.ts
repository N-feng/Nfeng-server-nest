import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsTypeAttribute as GoodsTypeAttributeModel } from '../../model/goods_type_attribute.model';
import { CreateGoodsTypeAttributeDto } from './dto/goods_type_attribute.dto';

@Injectable()
export class GoodsTypeAttributeService {
  constructor(@InjectModel(GoodsTypeAttributeModel) private readonly goodsTypeAttributeModel: ModelType<GoodsTypeAttributeModel>) {}

  async find(body?) {
    return await this.goodsTypeAttributeModel.find(body)
  }

  async create(body: CreateGoodsTypeAttributeDto) {
    await this.goodsTypeAttributeModel.create(body)
  }

  async update(id: string, body: CreateGoodsTypeAttributeDto) {
    return await this.goodsTypeAttributeModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsTypeAttributeModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsTypeAttributeModel
  }
}
