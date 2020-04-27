import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccessDto {
  @ApiPropertyOptional({ description: '模块名称', example: 'module_name' })
  module_name: string
  @ApiPropertyOptional({ description: '节点类型:1、表示模块 2、表示菜单 3、操作', example: 1 })
  type: number
  @ApiPropertyOptional({ description: '操作名称', example: 'action_name' })
  action_name: string
  @ApiPropertyOptional({ description: '路由跳转地址', example: 'url' })
  url: string
  @ApiPropertyOptional({ description: '此module_id和当前模型的_id关联 module_id=0 表示模块', example: '0' })
  module_id: string
  @ApiPropertyOptional({ description: '排序', example: 100 })
  sort: number
  @ApiPropertyOptional({ description: '描述', example: 'description' })
  description: string
}