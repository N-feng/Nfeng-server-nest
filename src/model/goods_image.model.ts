import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsImage {
  @prop()
  goodsId: mongoose.Schema.Types.ObjectId
  @prop()
  imgUrl: string
  @prop()
  color_id: mongoose.Schema.Types.Mixed
  @prop()
  cateId: mongoose.Schema.Types.ObjectId
  @prop({ default: 100 })
  sort: number
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  createAt: number
}