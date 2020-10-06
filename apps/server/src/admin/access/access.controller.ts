import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/access.dto';
import { Config } from '../../config/config';

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
  async findOne(@Body('id') id: string) {
    const role = await this.accessService.findOne(id)
    return {code: 200, data: role}
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

  @Post('delete')
  @ApiOperation({ summary: '删除权限' })
  async delete(@Body('id') id: string) {
    await this.accessService.delete(id)
    return {code: 200, data: {}}
  }
}
