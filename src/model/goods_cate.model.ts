import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class GoodsCate {
  @prop()
  title: string
  @prop()
  cateImg: string
  @prop()
  link: string
  @prop()
  template: string // 指定当前分类的模板
  @prop()
  pid: mongoose.Schema.Types.Mixed // 混合类型
  @prop()
  subTitle: string // seo相关标题 关键词 描述
  @prop()
  keywords: string
  @prop()
  description: string
  @prop({ default: 1 })
  status: number
  @prop({ default: 100 })
  sort: number
  @prop({ default: d.getTime() })
  createAt: number
}