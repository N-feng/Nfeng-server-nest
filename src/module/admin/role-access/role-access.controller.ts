
import { Controller, Put, Post, Param, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleAccessService } from '../../../service/role-access/role-access.service';
import { CreateRoleAccessDto } from '../../../dto/create-role-access.dto';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/role-access`)
@ApiTags('授权')
export class RoleAccessController {
  constructor(private readonly roleAccessService: RoleAccessService) {}

  @Get()
  @ApiOperation({ summary: '角色权限列表' })
  async index() {
    return await this.roleAccessService.find()
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
