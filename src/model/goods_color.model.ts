import { prop } from '@typegoose/typegoose';

export class GoodsColor {
  @prop()
  colorName: string
  @prop()
  colorValue: string
  @prop({ default: 1 })
  status?: number
}