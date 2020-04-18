import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Role as RoleSchema } from './model/role.model';
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RoleService {
  constructor(@InjectModel(RoleSchema) private readonly roleModel: ModelType<RoleSchema>) {}

  async findAll() {
    return await this.roleModel.find()
  }

  async create(body: CreateRoleDto) {
    return await this.roleModel.create(body)
  }

  async update(id:string, body: CreateRoleDto) {
    await this.roleModel.findByIdAndUpdate(id, body)
  }

  async delete(id: string) {
    return await this.roleModel.findByIdAndDelete(id)
  }
}
