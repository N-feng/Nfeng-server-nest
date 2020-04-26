import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiPropertyOptional({ description: '用户名称', example: 'username' })
  username: string
  @ApiPropertyOptional({ description: '用户密码', example: 'password' })
  password: string
  @ApiPropertyOptional({ description: '用户电话', example: 'mobile' })
  mobile: string
  @ApiPropertyOptional({ description: '用户邮箱', example: 'email' })
  email: string
  @ApiPropertyOptional({ description: '用户角色', example: 'role_id' })
  role_id: string
}