import { ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateUserDto {
  @ApiPropertyOptional({ description: '用户名称' })
  username: string
  @ApiPropertyOptional({ description: '用户密码' })
  password: string
  @ApiPropertyOptional({ description: '用户电话' })
  mobile: string
  @ApiPropertyOptional({ description: '用户邮箱' })
  email: string
  @ApiPropertyOptional({ description: '用户角色' })
  roleId: mongoose.Schema.Types.ObjectId
}