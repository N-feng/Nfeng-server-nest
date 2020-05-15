import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
const d = new Date();

export class Auth {
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
  roleId: mongoose.Schema.Types.ObjectId
  @prop({ default: d.getTime() })
  createAt: number
  @prop()
  isSuper: number
}