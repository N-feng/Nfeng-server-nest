import { prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

export class RoleAccess {
  @prop()
  accessId: mongoose.Schema.Types.ObjectId
  @prop()
  roleId
}