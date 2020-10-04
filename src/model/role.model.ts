import { prop } from '@typegoose/typegoose'
const d = new Date()

export class Role {
  @prop()
  title?: string
  @prop()
  description: string
  @prop()
  status?: string
  @prop({default: d.getTime()})
  createAt?: number
}
