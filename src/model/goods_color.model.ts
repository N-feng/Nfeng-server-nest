import { prop } from '@typegoose/typegoose';

export class GoodsColor {
  @prop()
  color_name: string
  @prop()
  color_value: string
  @prop({ default: 1 })
  status: number
}