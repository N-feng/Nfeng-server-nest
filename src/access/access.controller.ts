import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiPropertyOptional, ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Access as AccessSchema } from './access.model';
import * as mongoose from 'mongoose'

class CreateAccessDto {
  @ApiPropertyOptional({ description: '模块名称', example: 'module_name' })
  module_name: string
  @ApiPropertyOptional({ description: '节点类型:1、表示模块 2、表示菜单 3、操作', example: 1 })
  type: number
  @ApiPropertyOptional({ description: '操作名称', example: 'action_name' })
  action_name: string
  @ApiPropertyOptional({ description: '路由跳转地址', example: 'url' })
  url: string
  @ApiPropertyOptional({ description: '此module_id和当前模型的_id关联 module_id=0 表示模块', example: '0' })
  module_id
  @ApiPropertyOptional({ description: '排序', example: 100 })
  sort: number
  @ApiPropertyOptional({ description: '描述', example: 'description' })
  description: string
}

@Controller('access')
@ApiTags('权限')
export class AccessController {
  constructor(
    @InjectModel(AccessSchema) private readonly accessModel: ModelType<AccessSchema>
  ) { }

  @Get()
  @ApiOperation({ summary: '权限列表' })
  async index() {
    return await this.accessModel.aggregate([
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
          module_id: '0'
        }
      }
    ])
  }

  @Post()
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() createPostDto: CreateAccessDto) {
    const { module_id } = createPostDto
    if(module_id!='0') {
      createPostDto.module_id = mongoose.Types.ObjectId(module_id)
    }
    await this.accessModel.create(createPostDto)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑权限' })
  async update(@Param('id') id: string, @Body() updateAdminDto: CreateAccessDto) {
    await this.accessModel.findByIdAndUpdate(id, updateAdminDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Param('id') id: string) {
    await this.accessModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
