import { IsNotEmpty, MinLength } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({ description: '账户', example: '' })
  @IsNotEmpty({ message: '请填写账户' })
  username: string
  @ApiPropertyOptional({ description: '密码', example: '' })
  @IsNotEmpty({ message: '请填写密码' })
  @MinLength(6, { message: '最少输入6位密码' })
  password: string
}