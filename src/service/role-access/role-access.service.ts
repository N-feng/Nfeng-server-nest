import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RoleAccess as RoleAccessModel } from 'src/model/role_access.model';
import { CreateRoleAccessDto } from 'src/dto/role_access.dto';
import { AccessService } from 'src/service/access/access.service';
import * as mongoose from 'mongoose';
import { Config } from 'src/config/config';
const { ObjectId } = mongoose.Types;


@Injectable()
export class RoleAccessService {
  constructor(
    @InjectModel(RoleAccessModel) private readonly roleAccessModel: ModelType<RoleAccessModel>,
    private readonly accessService: AccessService
  ) { }

  async find(body?) {
    return await this.roleAccessModel.find(body)
  }

  async create(body) {
    return await this.roleAccessModel.create(body)
  }

  async update(id, body:CreateRoleAccessDto) {
    return await this.roleAccessModel.findByIdAndUpdate(id, body)
  }

  async deleteMany(body) {
    return await this.roleAccessModel.deleteMany(body)
  }

  async checkAuth(req) {
    /*
      1、获取当前用户的角色    （如果超级用户跳过权限判断 isSuper=1）
      2、根据角色获取当前角色的权限列表
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    // 1、获取当前用户的角色
    const userInfo = req.session.userInfo
    const roleId = userInfo.roleId
    if (userInfo.isSuper == 1) { // 超级管理员
      return true
    }

    // 2、根据角色获取当前角色的权限列表
    const roleAccessResult = await this.roleAccessModel.find({ roleId: new ObjectId(roleId) })
    const roleAccessArray = []
    roleAccessResult.forEach((value) => {
      roleAccessArray.push(value.accessId.toString())
    })

    // 3、获取当前访问的url 对应的权限id
    const { baseUrl } = req
    const pathname = baseUrl.replace(`/${Config.adminPath}/`, '')
    const accessResult = await this.accessService.find({ url: pathname })

    if (accessResult.length > 0) {

      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      if (roleAccessArray.indexOf(accessResult[0]._id.toString()) != -1) {
        return true
      } else {
        return false
      }

    } else {
      return false
    }

  }
}
