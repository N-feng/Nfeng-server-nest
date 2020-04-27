import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsTypeDto {
  @ApiPropertyOptional({ description: '商品类型名称' })
  @IsNotEmpty({ message: '商品类型名称不能为空' })
  title: string
  @ApiPropertyOptional({ description: '商品类型描述' })
  @IsNotEmpty({ message: '商品类型描述不能为空' })
  description: string
}