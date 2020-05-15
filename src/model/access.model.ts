import { prop } from '@typegoose/typegoose'
import * as mongoose from 'mongoose';
const d = new Date();

export class Access {
  @prop()
  moduleName: string
  @prop()
  actionName: string
  @prop()
  type: number
  @prop()
  url: string
  @prop()
  moduleId: mongoose.Schema.Types.Mixed
  @prop()
  sort: number
  @prop()
  description: string
  @prop({ default: 1 })
  status: number
  @prop()
  createAt: number
}