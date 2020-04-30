import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsAttr {
  @prop()
  goods_id: mongoose.Schema.Types.ObjectId
   // 备用字段 开始
  @prop()
  goods_cate_id: mongoose.Schema.Types.ObjectId
  @prop()
  attribute_cate_id: mongoose.Schema.Types.ObjectId
  @prop()
  attribute_id: mongoose.Schema.Types.ObjectId
  @prop()
  attribute_type: string
   // 备用字段 结束
  @prop()
  attribute_title: string
  @prop()
  attribute_value: string
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  add_time: number
}