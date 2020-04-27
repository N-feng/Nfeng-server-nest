import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GoodsCate as GoodsCateModel } from '../../model/goods_cate.model';
import { CreateGoodsCateDto } from '../../dto/goods_cate.dto';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Injectable()
export class GoodsCateService {
  constructor(@InjectModel(GoodsCateModel) private readonly goodsCateModel: ModelType<GoodsCateModel>) {}

  async find(body?) {
    return await this.goodsCateModel.find(body)
  }

  async create(body: CreateGoodsCateDto) {
    await this.goodsCateModel.create({...body, pid: body.pid != '0' ? ObjectId(body.pid) : body.pid})
  }

  async update(id: string, body: CreateGoodsCateDto) {
    return await this.goodsCateModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.goodsCateModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.goodsCateModel
  }
}
