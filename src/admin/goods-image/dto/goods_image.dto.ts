import { ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateGoodsImageDto {
  @ApiPropertyOptional({ description: '商品ID' })
  goodsId: mongoose.Schema.Types.ObjectId
  @ApiPropertyOptional({ description: '图片地址' })
  imgUrl: string
  // @ApiPropertyOptional({ description: '图片颜色' })
  // color_id: number
  // @ApiPropertyOptional({ description: '图片排序' })
  // sort: number
  // @ApiPropertyOptional({ description: '商品状态' })
  // state: number
  // @ApiPropertyOptional({ description: '增加时间' })
  // createAt?: number
}