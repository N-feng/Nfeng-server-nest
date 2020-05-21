import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsCateDto {
  @ApiPropertyOptional({ description: '商品分类ID' })
  id: string
  @ApiPropertyOptional({ description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  title: string
  @ApiPropertyOptional({ description: '上级分类', example: '0' })
  @IsNotEmpty({ message: '上级分类不能为空' })
  pid: string
  @ApiPropertyOptional({ description: '分类图片' })
  cateImg: string
  @ApiPropertyOptional({ description: '跳转地址' })
  link: string
  @ApiPropertyOptional({ description: '分类模板' })
  template: string
  @ApiPropertyOptional({ description: 'Seo标题' })
  subTitle: string
  @ApiPropertyOptional({ description: 'Seo关键词' })
  keywords: string
  @ApiPropertyOptional({ description: 'Seo描述' })
  description: string
  @ApiPropertyOptional({ description: '排序', example: 100 })
  @IsNotEmpty({ message: '排序不能为空' })
  sort: number
  @ApiPropertyOptional({ description: '状态' })
  status: number
}