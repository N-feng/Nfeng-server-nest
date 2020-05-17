import { Controller, Get, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from 'src/service/access/access.service';
import { CreateAccessDto } from 'src/dto/access.dto';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/access`)
@ApiTags('权限')
export class AccessController {
  constructor(private readonly accessService: AccessService) { }

  @Post('findAll')
  @ApiOperation({ summary: '权限列表' })
  async findAll() {
    //1、在access表中找出  moduleId=0的数据
    //2、让access表和access表关联    条件：找出access表中moduleId等于_id的数据
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'moduleId',
          as: 'children'
        }
      },
      {
        $match: {
          moduleId: '0'
        }
      }
    ])
    return { code: 200, data: { list: result } }
  }

  @Post('findOne')
  @ApiOperation({ summary: '权限详情' })
  async findOne(@Query('id') id: string) {
    const role = await this.accessService.findOne(id)
    return {code: 200, data: role}
  }

  @Post('getModules')
  @ApiOperation({ summary: '模块枚举' })
  async getModules() {
    const result = await this.accessService.getModel().aggregate([
      {
        $match: {
          moduleId: '0'
        }
      }
    ])
    const list = [{
      label: '顶级模块',
      value: '0'
    },...result.map((item) => {
      return {
        label: item.moduleName,
        value: item._id,
      }
    })]
    return { code: 200, data: { list } }
  }

  @Post('create')
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() body: CreateAccessDto) {
    await this.accessService.create(body)
    return {code: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '更新权限' })
  async update(@Body() body: CreateAccessDto) {
    await this.accessService.update(body.id, body)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Param('id') id: string) {
    await this.accessService.delete(id)
    return {code: 200, data: {}}
  }
}
