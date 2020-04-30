import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsImage {
  @prop()
  goods_id: mongoose.Schema.Types.ObjectId
  @prop()
  img_url: string
  @prop()
  color_id: mongoose.Schema.Types.Mixed
  @prop()
  cate_id: mongoose.Schema.Types.ObjectId
  @prop({ default: 100 })
  sort: number
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  add_time: number
}