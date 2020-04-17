import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class Admin {
  @prop()
  username: string
  @prop()
  password: string
  @prop()
  mobile: string
  @prop()
  email: string
  @prop({ default: 1 })
  status: number
  @prop()
  role_id: mongoose.Schema.Types.ObjectId
  @prop({ default: d.getTime() })
  add_time: number
  @prop()
  is_super: number
}