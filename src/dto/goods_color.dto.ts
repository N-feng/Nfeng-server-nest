import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsColorDto {
  @ApiPropertyOptional({ description: '商品颜色名称' })
  @IsNotEmpty({ message: '商品颜色名称不能为空' })
  color_name: string
  @ApiPropertyOptional({ description: '商品颜色色值' })
  @IsNotEmpty({ message: '商品颜色色值不能为空' })
  color_value: string
  @ApiPropertyOptional({ description: '商品颜色状态', example: 1 })
  @IsNotEmpty({ message: '商品颜色状态不能为空' })
  status: number
}