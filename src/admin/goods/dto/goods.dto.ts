import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoodsDto {
  @ApiPropertyOptional({ description: '商品名称' })
  title: string
  @ApiPropertyOptional({ description: '二级标题' })
  subTitle: string
  @ApiPropertyOptional({ description: '货号' })
  goods_sn: string
  @ApiPropertyOptional({ description: '商品分类' })
  goods_cate_id: string
  @ApiPropertyOptional({ description: '点击数量' })
  click_count: number
  @ApiPropertyOptional({ description: '商品库存' })
  goods_number: number
  @ApiPropertyOptional({ description: '商铺价格(原价)' })
  shop_price: number
  @ApiPropertyOptional({ description: '市场价格(现价)' })
  market_price: number
  @ApiPropertyOptional({ description: '关联商品' })
  relation_goods: string
  @ApiPropertyOptional({ description: '商品属性' })
  goods_attrs: string
  @ApiPropertyOptional({ description: '商品版本' })
  goods_version: string
  @ApiPropertyOptional({ description: '商品图片' })
  goods_img: string
  @ApiPropertyOptional({ description: '商品关联赠品' })
  goods_gift: string
  @ApiPropertyOptional({ description: '商品配件' })
  goods_fitting: string
  @ApiPropertyOptional({ description: '商品颜色' })
  goods_color: string[]
  @ApiPropertyOptional({ description: '商品关键词' })
  goods_keywords: string
  @ApiPropertyOptional({ description: '商品描述' })
  goods_desc: string
  @ApiPropertyOptional({ description: '商品内容' })
  goods_content: string
  @ApiPropertyOptional({ description: '排序' })
  sort: number
  @ApiPropertyOptional({ description: '是否删除' })
  is_delete: number
  @ApiPropertyOptional({ description: '是否热销' })
  is_hot: number
  @ApiPropertyOptional({ description: '是否精选' })
  is_best: number
  @ApiPropertyOptional({ description: '是否最新商品' })
  is_new: number
  @ApiPropertyOptional({ description: '商品类型' })
  goods_type_id: string
  @ApiPropertyOptional({ description: '商品状态' })
  state: number
  @ApiPropertyOptional({ description: '增加时间' })
  createAt: number
  @ApiPropertyOptional({ description: '商品图库' })
  goods_image_list?: string[]
  @ApiPropertyOptional({ description: '商品类型id' })
  attr_id_list?: string[]
  @ApiPropertyOptional({ description: '商品类型值' })
  attr_value_list?: string[]
}