import { prop } from '@typegoose/typegoose'
import * as mongoose from 'mongoose';
const d = new Date();

export class Access {
  @prop()
  module_name: string
  @prop()
  action_name: string
  @prop()
  type: number
  @prop()
  url: string
  @prop()
  module_id: mongoose.Schema.Types.Mixed
  @prop()
  sort: number
  @prop()
  description: string
  @prop({ default: 1 })
  status: number
  @prop()
  add_time: number
}