import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccessDto {
  @ApiPropertyOptional({ description: '权限ID' })
  id?: string
  @ApiPropertyOptional({ description: '模块名称', example: 'moduleName' })
  moduleName: string
  @ApiPropertyOptional({ description: '节点类型:1、表示模块 2、表示菜单 3、操作', example: 1 })
  type: number
  @ApiPropertyOptional({ description: '操作名称', example: 'actionName' })
  actionName: string
  @ApiPropertyOptional({ description: '路由跳转地址', example: 'url' })
  url: string
  @ApiPropertyOptional({ description: '此moduleId和当前模型的_id关联 moduleId=0 表示模块', example: '0' })
  moduleId: string
  @ApiPropertyOptional({ description: '排序', example: 100 })
  sort: number
  @ApiPropertyOptional({ description: '描述', example: 'description' })
  description: string
}