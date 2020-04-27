import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsCateDto {
  @ApiPropertyOptional({ description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  title: string
  @ApiPropertyOptional({ description: '上级分类', example: '0' })
  @IsNotEmpty({ message: '上级分类不能为空' })
  pid: string
  @ApiPropertyOptional({ description: '分类图片' })
  @IsNotEmpty({ message: '分类图片不能为空' })
  cate_img: string
  @ApiPropertyOptional({ description: '跳转地址' })
  @IsNotEmpty({ message: '跳转地址不能为空' })
  link: string
  @ApiPropertyOptional({ description: '分类模板' })
  @IsNotEmpty({ message: '分类模板不能为空' })
  template: string
  @ApiPropertyOptional({ description: 'Seo关键词' })
  @IsNotEmpty({ message: 'Seo关键词不能为空' })
  sub_title: string
  @ApiPropertyOptional({ description: 'Seo描述' })
  @IsNotEmpty({ message: 'Seo描述不能为空' })
  description: string
  @ApiPropertyOptional({ description: '排序', example: 100 })
  @IsNotEmpty({ message: '排序不能为空' })
  sort: number
  @ApiPropertyOptional({ description: '状态', example: 1 })
  @IsNotEmpty({ message: '状态不能为空' })
  status: number
}