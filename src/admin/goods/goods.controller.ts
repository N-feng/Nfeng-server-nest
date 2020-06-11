import { Controller, Post, Body, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsService } from 'src/admin/goods/goods.service';
import { GoodsImageService } from 'src/admin/goods-image/goods-image.service';
import { GoodsTypeAttributeService } from 'src/admin/goods-type-attribute/goods-type-attribute.service';
import { GoodsAttrService } from 'src/admin/goods-attr/goods-attr.service';
import { CreateGoodsDto } from 'src/admin/goods/dto/goods.dto';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/goods`)
@ApiTags('商品')
export class GoodsController {
  constructor(
    private goodsService: GoodsService,
    private goodsImageService: GoodsImageService,
    private goodsTypeAttributeService: GoodsTypeAttributeService,
    private goodsAttrService: GoodsAttrService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品列表' })
  async index(@Query() query) {
    // 分页 搜索商品数据
    const {keyword} = query;
    // 条件
    let json = {};
    if (keyword) {
      json = Object.assign(json, {"title": { $regex: new RegExp(keyword) }});
    }

    const page = query.page || 1
    const pageSize = 3
    const skip = (page - 1) * pageSize
    const goodsResult = await this.goodsService.find(json, skip, pageSize)

    const count = await this.goodsService.count(json)

    const totalPages = Math.ceil(count / pageSize)

    return {status: 200, data: {list: goodsResult, page, totalPages, keyword}}
  }

  @Post('findOne')
  @ApiOperation({ summary: '商品详情' })
  async findOne(@Body('id') id: string) {
    const role = await this.goodsService.findOne(id)
    return {status: 200, data: role}
  }

  @Post('create')
  @ApiOperation({ summary: '创建商品' })
  @UseInterceptors(FileInterceptor('goodsImg'))
  async create(@Body() body: CreateGoodsDto) {

    // 1、增加商品数据
    const result = await this.goodsService.create(body)

    // 2、增加图库
    const {goodsImageList} = body

    if (result._id && goodsImageList) {
      for (let i = 0; i < goodsImageList.length; i++) {
        await this.goodsImageService.create({
          goodsId: result._id,
          imgUrl: goodsImageList[i]
        })
      }
    }

    // 3、增加商品属性
    const {attrIdList, attrValueList} = body

    if (result._id && attrIdList) {
      for (let i = 0; i < attrIdList.length; i++) {
        // 获取当前 商品类型id对应的商品类型属性
        const goodsTypeAttributeResult = await this.goodsTypeAttributeService.find({ _id: attrIdList[i] });

        this.goodsAttrService.create({
          goodsId: result._id,
          // 可能会用到的字段 开始
          goodsCateId: result.goodsCateId,
          attributeId: attrIdList[i],
          attributeType: goodsTypeAttributeResult[0].attrType,
          // 可能会用到的字段 结束
          attributeTitle: goodsTypeAttributeResult[0].title,
          attributeValue: attrValueList[i],
        })
      }
    }

    return {status: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '更新商品' })
  async update(@Body() body: CreateGoodsDto) {

    // 1、修改商品数据
    const result = await this.goodsService.update(body.id, body)

    // 3、修改商品属性
    const {attrIdList, attrValueList} = body
    const goodsId = body.id

    await this.goodsAttrService.deleteMany({ goodsId })

    if (goodsId && attrIdList) {
      for (let i = 0; i < attrIdList.length; i++) {
        // 获取当前 商品类型id对应的商品类型属性
        const goodsTypeAttributeResult = await this.goodsTypeAttributeService.find({ _id: attrIdList[i] });

        this.goodsAttrService.create({
          goodsId,
          // 可能会用到的字段 开始
          goodsCateId: result.goodsCateId,
          attributeId: attrIdList[i],
          attributeType: goodsTypeAttributeResult[0].attrType,
          // 可能会用到的字段 结束
          attributeTitle: goodsTypeAttributeResult[0].title,
          attributeValue: attrValueList[i],
        })
      }
    }

    return {status: 200, data: {}}
  }

  @Post('delete')
  @ApiOperation({ summary: '删除商品' })
  async delete(@Body('id') id: string) {
    await this.goodsService.delete(id)
    return {status: 200, data: {}}
  }
}
