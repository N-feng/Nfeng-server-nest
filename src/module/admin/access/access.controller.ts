import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from '../../../service/access/access.service';
import { CreateAccessDto } from '../../../dto/access.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/access`)
@ApiTags('权限')
export class AccessController {
  constructor(private readonly accessService: AccessService) { }

  @Get()
  @ApiOperation({ summary: '权限列表' })
  async index() {
    //1、在access表中找出  module_id=0的数据
    //2、让access表和access表关联    条件：找出access表中module_id等于_id的数据
    var result = await this.accessService.getModel().aggregate([
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
    ])

    // console.log(JSON.stringify(result))

    return result
  }

  @Post()
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() body: CreateAccessDto) {
    await this.accessService.create(body)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑权限' })
  async update(@Param('id') id: string, @Body() body: CreateAccessDto) {
    await this.accessService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Param('id') id: string) {
    await this.accessService.delete(id)
    return {
      success: true
    }
  }
}
