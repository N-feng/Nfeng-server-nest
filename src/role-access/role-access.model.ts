import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

export class RoleAccess {
  @prop()
  access_id: mongoose.Schema.Types.ObjectId
  @prop()
  role_id
}