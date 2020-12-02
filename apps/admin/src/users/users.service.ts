import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User as UserModel } from '@libs/db/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
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
