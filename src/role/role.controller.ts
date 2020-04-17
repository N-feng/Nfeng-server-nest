import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiPropertyOptional, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Role as RoleSchema } from './role.model';

class CreateRoleDto {
  @ApiPropertyOptional({ description: '角色名称', example: '销售部门' })
  @IsNotEmpty({ message: '请填写角色名称' })
  title: string
  @ApiPropertyOptional({ description: '角色描述', example: '销售部门' })
  @IsNotEmpty({ message: '请填写角色描述' })
  description: string
}

@Controller('role')
@ApiTags('角色')
export class RoleController {
  constructor(
    @InjectModel(RoleSchema) private readonly roleModel: ModelType<RoleSchema>
  ) {}

  @Get()
  @ApiOperation({ summary: '角色列表' })
  async index() {
    return await this.roleModel.find()
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() CreateRoleDto: CreateRoleDto) {
    await this.roleModel.create(CreateRoleDto)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑角色' })
  async update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
    await this.roleModel.findByIdAndUpdate(id, updateRoleDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  async remove(@Param('id') id: string) {
    await this.roleModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
