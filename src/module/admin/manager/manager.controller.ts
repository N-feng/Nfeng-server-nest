import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsService } from './../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';
import { CreateAdminDto } from '../../../dto/create-admin.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/manager`)
@ApiTags('管理员')
export class ManagerController {
  constructor(private toolsService: ToolsService, private adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async index() {
    //获取admin表以及role表关联数据
    var result=await this.adminService.getModel().aggregate([
      {
        $lookup: {
          from: "role",
          localField: "role_id",
          foreignField: "_id",
          as: "role"
        }
      }
    ])

    // console.log(JSON.stringify(result))

    return {
      adminResult:result
    }
  }

  @Post()
  @ApiOperation({ summary: '创建管理员' })
  async create(@Body() body: CreateAdminDto) {
    const password = this.toolsService.getMd5(body.password)
    await this.adminService.create({...body, password})
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
