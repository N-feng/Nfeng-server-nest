import { ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateGoodsAttrDto {
  @ApiPropertyOptional({ description: '商品ID' })
  goods_id?: string

  @ApiPropertyOptional({ description: '商品分类ID' })
  goods_cate_id?: mongoose.Schema.Types.ObjectId
  @ApiPropertyOptional({ description: '商品类型属性ID' })
  attribute_cate_id?: string
  @ApiPropertyOptional({ description: '商品类型属性ID' })
  attribute_id?: string
  @ApiPropertyOptional({ description: '商品类型属性类型' })
  attribute_type?: string

  @ApiPropertyOptional({ description: '商品类型属性名称' })
  attribute_title?: string
  @ApiPropertyOptional({ description: '商品类型属性值' })
  attribute_value?: string

  @ApiPropertyOptional({ description: '商品状态' })
  state?: number
  @ApiPropertyOptional({ description: '增加时间' })
  createAt?: number
}