import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsTypeAttribute {
  @prop()
  cateId: mongoose.Schema.Types.ObjectId
  @prop()
  title: string
  @prop()
  attrType: string // 类型 1 input 2 textarea 3 select
  @prop()
  attrValue: string // 默认值 input textarea 默认值是空 select框有默认值 多个默认值以回车隔开
  @prop({ default: 1 })
  status?: number
  @prop({ default: d.getTime() })
  createAt?: number
}