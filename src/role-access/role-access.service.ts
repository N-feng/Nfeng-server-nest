import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RoleAccess as RoleAccessSchema } from './role-access.model';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


@Injectable()
export class RoleAccessService {
  constructor(@InjectModel(RoleAccessSchema) private readonly roleAccessModel: ModelType<RoleAccessSchema>) {}

  async find(id) {
    // 查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中

    const accessResult = await this.roleAccessModel.find({role_id: new ObjectId(id)})

    const roleAccessArray = []

    accessResult.forEach((value) => {
      roleAccessArray.push(value.access_id.toString())
    })

    return roleAccessArray
  }

  async update(id, body) {
    const role_id = new ObjectId(id)

    const { access_node } = body

    // 1、删除当前角色下面的所有权限

    await this.roleAccessModel.deleteMany({ role_id })

    // 2、把当前角色对应的所有权限增加到role_access表里面

    for (let i = 0;i < access_node.length;i++) {
      await this.roleAccessModel.create({
        role_id,
        access_id: access_node[i]
      })
    }
  }
}
