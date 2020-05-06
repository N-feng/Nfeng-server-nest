import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Role as RoleModel } from '../../model/role.model';
import { CreateRoleDto } from '../../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(RoleModel) private readonly roleModel: ModelType<RoleModel>) {}

  async find(body?, skip = 0, limit = 0, fields?: string) {
    return await this.roleModel.find(body, fields).skip(skip).limit(limit)
  }

  async count(body?) {
    return await this.roleModel.find(body).count()
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
