
import { Controller, Put, Post, Param, Body, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from '../../../service/access/access.service';
import { RoleAccessService } from '../../../service/role-access/role-access.service';
import { CreateRoleAccessDto } from '../../../dto/role_access.dto';
import { Config } from '../../../config/config';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Controller(`${Config.adminPath}/role-access`)
@ApiTags('授权')
export class RoleAccessController {
  constructor(
    private accessService: AccessService,
    private roleAccessService: RoleAccessService
  ) {}

  @Get()
  @ApiOperation({ summary: '角色权限列表' })
  async index(@Request() req) {

    // 1、获取全部的权限
    const {userinfo} = req.session
    const {role_id} = userinfo
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      {
        $match: {
          "module_id": '0'
        }
      }
    ]);

    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    const accessResult = await this.roleAccessService.find({ role_id });
    console.log(accessResult)

    const roleAccessArray = [];
    accessResult.forEach((value) => {
      roleAccessArray.push(value.access_id.toString())
    });

    // 3、循环遍历所有的权限数据，判断当前权限是否在角色权限的数组中

    return {
      asideList: result
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑角色权限' })
  async update(@Param('id') id: string, @Body() body: CreateRoleAccessDto) {
    const role_id = new ObjectId(id)

    const { access_node } = body

    // 1、删除当前角色下面的所有权限

    await this.roleAccessService.deleteMany({ role_id })

    // 2、把当前角色对应的所有权限增加到role_access表里面

    for (let i = 0; i < access_node.length; i++) {
      await this.roleAccessService.create({
        role_id,
        access_id: access_node[i]
      })
    }

    return {
      success: true
    }
  }

  @Post('checkAuth:id')
  @ApiOperation({ summary: '检查用户权限' })
  async checkAuth(@Param('id') id: string) {
    return await this.roleAccessService.checkAuth(id)
  }
}
