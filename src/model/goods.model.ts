import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class Goods {
  @prop()
  title: string
  @prop()
  subTitle: string
  @prop()
  goodsSn: string
  @prop()
  goodsCateId: mongoose.Schema.Types.ObjectId
  @prop({ default: 100 })
  clickCount: number
  @prop({ default: 1000 })
  goodsNumber: number
  @prop()
  shopPrice: number
  @prop()
  marketPrice: number
  @prop()
  relationGoods: string
  @prop()
  goodsAttrs: string
  @prop()
  goodsVersion: string /*版本*/
  @prop()
  goodsImg: string
  @prop()
  goodsGift: string
  @prop()
  goodsFitting: string
  @prop()
  goodsColor: string[]
  @prop()
  goodsKeywords: string
  @prop()
  goodsDesc: string
  @prop()
  goodsContent: string
  @prop({ default: 100 })
  sort: number
  @prop()
  isDelete: number
  @prop()
  isHot: number
  @prop()
  isBest: number
  @prop()
  isLatest: number
  @prop()
  goodsTypeId: mongoose.Schema.Types.ObjectId
  @prop({ default: 1 })
  status?: number
  @prop({ default: d.getTime() })
  createAt?: number
}