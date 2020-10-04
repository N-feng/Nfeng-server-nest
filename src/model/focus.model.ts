import { prop } from '@typegoose/typegoose'
const d = new Date()

export class Focus {
  @prop()
  title: string
  @prop()
  type: number
  @prop()
  focusImg: string
  @prop()
  link: string
  @prop()
  sort: number
  @prop({ default: 1 })
  status?: number
  @prop({ default: d.getTime() })
  createAt?: number
}