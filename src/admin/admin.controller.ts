import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Admin as AdminSchema } from './admin.model';

class CreateAdminDto {
  _id: string
  @ApiPropertyOptional({ description: '管理员名称', example: 'username' })
  username: string
  @ApiPropertyOptional({ description: '管理员密码', example: 'password' })
  password: string
  @ApiPropertyOptional({ description: '管理员电话', example: 'mobile' })
  mobile: string
  @ApiPropertyOptional({ description: '管理员邮箱', example: 'email' })
  email: string
  status: number
  @ApiPropertyOptional({ description: '管理员角色', example: 'role_id' })
  role_id: string
  add_time: number
  is_super: number
}

@Controller('admin')
@ApiTags('管理')
export class AdminController {
  constructor(
    @InjectModel(AdminSchema) private readonly adminModel: ModelType<AdminSchema>
  ) {}

  @Get()
  @ApiOperation({ summary: '显示管理员列表' })
  async index() {
    return await this.adminModel.aggregate([
      {
        $lookup: { from: 'role', localField: 'role_id', foreignField: '_id', as: 'role'  }
      }
    ])
  }

  @Post()
  @ApiOperation({ summary: '创建管理员' })
  async create(@Body() createPostDto: CreateAdminDto) {
    await this.adminModel.create(createPostDto)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑管理员' })
  async update(@Param('id') id: string, @Body() updateAdminDto: CreateAdminDto) {
    await this.adminModel.findByIdAndUpdate(id, updateAdminDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除管理员' })
  async remove(@Param('id') id: string) {
    await this.adminModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
