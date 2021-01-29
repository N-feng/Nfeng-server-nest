/*
 * @Date: 2021-01-25 10:05:27
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 14:41:08
 * @FilePath: /nfeng-server-nest/apps/server/src/admin/user/user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User as UserModel } from '../../model/user.model';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async find(body) {
    return await this.userModel.find(body)
  }

  async findOne(id) {
    return await this.userModel.findById(id)
  }

  async create(body: CreateUserDto) {
    await this.userModel.create(body)
  }

  async update(id: string, body: CreateUserDto) {
    return await this.userModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.userModel
  }
}
