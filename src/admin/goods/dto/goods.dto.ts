import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoodsDto {
  @ApiPropertyOptional({ description: '商品ID' })
  id?: string
  @ApiPropertyOptional({ description: '商品名称' })
  title: string
  @ApiPropertyOptional({ description: '二级标题' })
  subTitle: string
  @ApiPropertyOptional({ description: '货号' })
  goodsSn: string
  @ApiPropertyOptional({ description: '商品分类' })
  goodsCateId: string
  @ApiPropertyOptional({ description: '点击数量' })
  clickCount: number
  @ApiPropertyOptional({ description: '商品库存' })
  goodsNumber: number
  @ApiPropertyOptional({ description: '商铺价格(原价)' })
  shopPrice: number
  @ApiPropertyOptional({ description: '市场价格(现价)' })
  marketPrice: number
  @ApiPropertyOptional({ description: '关联商品' })
  relationGoods: string
  @ApiPropertyOptional({ description: '商品属性' })
  goodsAttrs: string
  @ApiPropertyOptional({ description: '商品版本' })
  goodsVersion: string
  @ApiPropertyOptional({ description: '商品图片' })
  goodsImg: string
  @ApiPropertyOptional({ description: '商品关联赠品' })
  goodsGift: string
  @ApiPropertyOptional({ description: '商品配件' })
  goodsFitting: string
  @ApiPropertyOptional({ description: '商品颜色' })
  goodsColor: string[]
  @ApiPropertyOptional({ description: '商品关键词' })
  goodsKeywords: string
  @ApiPropertyOptional({ description: '商品描述' })
  goodsDesc: string
  @ApiPropertyOptional({ description: '商品内容' })
  goodsContent: string
  @ApiPropertyOptional({ description: '排序' })
  sort: number
  @ApiPropertyOptional({ description: '是否删除' })
  isDelete: number
  @ApiPropertyOptional({ description: '是否热销' })
  isHot: number
  @ApiPropertyOptional({ description: '是否精选' })
  isBest: number
  @ApiPropertyOptional({ description: '是否最新商品' })
  isLatest: number
  @ApiPropertyOptional({ description: '商品类型' })
  goodsTypeId: string
  @ApiPropertyOptional({ description: '商品状态' })
  state: number
  @ApiPropertyOptional({ description: '增加时间' })
  createAt: number
  @ApiPropertyOptional({ description: '商品图库' })
  goodsImageList?: string[]
  @ApiPropertyOptional({ description: '商品类型id' })
  attrIdList?: string[]
  @ApiPropertyOptional({ description: '商品类型值' })
  attrValueList?: string[]
}