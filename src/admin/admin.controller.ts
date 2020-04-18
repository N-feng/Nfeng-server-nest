import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto';


@Controller('admin')
@ApiTags('管理员')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async index() {
    return await this.adminService.findAll()
  }

  @Post()
  @ApiOperation({ summary: '创建管理员' })
  async create(@Body() body: CreateAdminDto) {
    await this.adminService.create(body)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑管理员' })
  async update(@Param('id') id: string, @Body() body: CreateAdminDto) {
    await this.adminService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除管理员' })
  async remove(@Param('id') id: string) {
    this.adminService.delete(id)
    return {
      success: true
    }
  }
}
