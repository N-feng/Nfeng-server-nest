import { ApiPropertyOptional } from '@nestjs/swagger'

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '角色ID' })
  roleId: string
  @ApiPropertyOptional({ description: '授权节点', example: [] })
  accessNode: string[]
}