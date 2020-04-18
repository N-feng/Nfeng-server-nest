import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiPropertyOptional({ description: '管理员名称', example: 'username' })
  username: string
  @ApiPropertyOptional({ description: '管理员密码', example: 'password' })
  password: string
  @ApiPropertyOptional({ description: '管理员电话', example: 'mobile' })
  mobile: string
  @ApiPropertyOptional({ description: '管理员邮箱', example: 'email' })
  email: string
  @ApiPropertyOptional({ description: '管理员角色', example: 'role_id' })
  role_id: string
}