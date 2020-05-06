import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../../../service/role/role.service';
import { CreateRoleDto } from '../../../dto/role.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/role`)
@ApiTags('角色')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: '角色列表' })
  async index(@Query() query) {
    // 分页 搜索商品数据
    const {keyword} = query;
    // 条件
    let json = {};
    if (keyword) {
      json = Object.assign(json, {"title": { $regex: new RegExp(keyword) }});
    }

    const page = query.page || 1;
    const pageSize = 3;
    const skip = (page - 1) * pageSize;
    const list = await this.roleService.find(json, skip, pageSize)

    const count = await this.roleService.count(json)

    const total = Math.ceil(count / pageSize);

    return {
      code: 200,
      list,
      total
    }
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() body: CreateRoleDto) {
    await this.roleService.create(body)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑角色' })
  async update(@Param('id') id: string, @Body() body: CreateRoleDto) {
    await this.roleService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  async remove(@Param('id') id: string) {
    await this.roleService.delete(id)
    return {
      success: true
    }
  }
}
