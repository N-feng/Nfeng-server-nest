
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleAccessService } from 'src/admin/role-access/role-access.service';
import { CreateRoleAccessDto } from 'src/admin/role-access/dto/role_access.dto';
import { Config } from 'src/config/config';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Controller(`${Config.adminPath}/role-access`)
@ApiTags('授权')
export class RoleAccessController {
  constructor(private roleAccessService: RoleAccessService) { }

  @Post('findOne')
  @ApiOperation({ summary: '查询角色权限' })
  async findOne(@Body('id') id: string) {
    const roleId = new ObjectId(id)
    const result = await this.roleAccessService.find({ roleId })
    return { status: 200, data: { list: result } }
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色权限' })
  async update(@Body() body: CreateRoleAccessDto) {
    const roleId = new ObjectId(body.roleId)

    const { accessNode } = body

    // 1、删除当前角色下面的所有权限

    await this.roleAccessService.deleteMany({ roleId })

    // 2、把当前角色对应的所有权限增加到role_access表里面

    for (let i = 0; i < accessNode.length; i++) {
      await this.roleAccessService.create({
        roleId,
        accessId: accessNode[i]
      })
    }

    return { status: 200, data: {} }
  }

}
