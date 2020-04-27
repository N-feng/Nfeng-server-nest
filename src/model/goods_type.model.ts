import { prop } from '@typegoose/typegoose';
const d = new Date();

export class GoodsType {
  @prop()
  title: string
  @prop()
  description: string
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  add_time: number
}