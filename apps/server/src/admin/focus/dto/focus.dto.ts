import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger'

export class CreateFocusDto {
  @ApiPropertyOptional({ description: '图片ID' })
  id: string
  @ApiPropertyOptional({ description: '分类：1、网站 2、APP 3、小程序', example: 1 })
  @IsNotEmpty({ message: '请选择分类' })
  type: number
  @ApiPropertyOptional({ description: '名称' })
  @IsNotEmpty({ message: '请填写名称' })
  title: string
  @ApiPropertyOptional({ description: '跳转地址' })
  link: string
  @ApiPropertyOptional({ description: '轮播图' })
  @IsNotEmpty({ message: '请上传轮播图' })
  focusImg: string
  @ApiPropertyOptional({ description: '排序', example: 100 })
  sort: number
  @ApiPropertyOptional({ description: '状态' })
  status?: number
}