import { ApiPropertyOptional } from '@nestjs/swagger'

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '授权节点', example: [] })
  access_node: []
}