import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RoleService } from '../../../service/role/role.service'
import { CreateRoleDto } from '../../../dto/create-role.dto'


@Controller('role')
@ApiTags('角色')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: '角色列表' })
  async index() {
    return await this.roleService.find()
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
