
import { Controller, Put, Param, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleAccessService } from './role-access.service';
import { CreateRoleAccessDto } from './dto/create-role-access.dto';

@Controller('role-access')
@ApiTags('授权')
export class RoleAccessController {
  constructor(private readonly roleAccessService: RoleAccessService) {}

  @Get(':id')
  @ApiOperation({ summary: '获取角色权限' })
  async index(@Param('id') id: string) {
    return this.roleAccessService.find(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑角色权限' })
  async update(@Param('id') id: string, @Body() body: CreateRoleAccessDto) {
    this.roleAccessService.update(id, body)
    return {
      success: true
    }
  }
}
