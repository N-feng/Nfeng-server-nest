import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsAttr {
  @prop()
  goodsId: mongoose.Schema.Types.ObjectId
   // 备用字段 开始
  @prop()
  goodsCateId: mongoose.Schema.Types.ObjectId
  @prop()
  attribute_cate_id: mongoose.Schema.Types.ObjectId
  @prop()
  attributeId: mongoose.Schema.Types.ObjectId
  @prop()
  attributeType: string
   // 备用字段 结束
  @prop()
  attributeTitle: string
  @prop()
  attributeValue: string
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  createAt: number
}