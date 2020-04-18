import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';

@Controller('access')
@ApiTags('权限')
export class AccessController {
  constructor(private readonly accessService: AccessService) { }

  @Get()
  @ApiOperation({ summary: '权限列表' })
  async index() {
    return await this.accessService.findAll()
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
