import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoodsImageDto {
  @ApiPropertyOptional({ description: '商品ID' })
  goods_id: string
  @ApiPropertyOptional({ description: '图片地址' })
  img_url: string
  // @ApiPropertyOptional({ description: '图片颜色' })
  // color_id: number
  // @ApiPropertyOptional({ description: '图片排序' })
  // sort: number
  // @ApiPropertyOptional({ description: '商品状态' })
  // state: number
  // @ApiPropertyOptional({ description: '增加时间' })
  // add_time: number
}