import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class Goods {
  @prop()
  title: string
  @prop()
  subTitle: string
  @prop()
  goods_sn: string
  @prop()
  goods_cate_id: mongoose.Schema.Types.ObjectId
  @prop({ default: 100 })
  click_count: number
  @prop({ default: 1000 })
  goods_number: number
  @prop()
  shop_price: number
  @prop()
  market_price: number
  @prop()
  relation_goods: string
  @prop()
  goods_attrs: string
  @prop()
  goods_version: string /*版本*/
  @prop()
  goods_img: string
  @prop()
  goods_gift: string
  @prop()
  goods_fitting: string
  @prop()
  goods_color: string
  @prop()
  goods_keywords: string
  @prop()
  goods_desc: string
  @prop()
  goods_content: string
  @prop({ default: 100 })
  sort: number
  @prop()
  is_delete: number
  @prop()
  is_hot: number
  @prop()
  is_best: number
  @prop()
  is_new: number
  @prop()
  goods_type_id: mongoose.Schema.Types.ObjectId
  @prop({ default: 1 })
  status: number
  @prop({ default: d.getTime() })
  createAt: number
}