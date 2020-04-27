import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsTypeAttributeDto {
  @ApiPropertyOptional({ description: '属性名称' })
  @IsNotEmpty({ message: '属性名称不能为空' })
  title: string
  @ApiPropertyOptional({ description: '所属类型' })
  @IsNotEmpty({ message: '所属类型不能为空' })
  cate_id: string
  @ApiPropertyOptional({ description: '录入方式 类型 1 input 2 textarea 3 select', example: '1' })
  @IsNotEmpty({ message: '录入方式不能为空' })
  attr_type: string
  @ApiPropertyOptional({ description: '可选值列表 input textarea 默认值是空 select框有默认值 多个默认值以回车隔开' })
  @IsNotEmpty({ message: '可选值列表不能为空' })
  attr_value: string
}