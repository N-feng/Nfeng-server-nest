import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsService } from '../../../service/goods/goods.service';
import { GoodsImageService } from '../../../service/goods-image/goods-image.service';
import { GoodsTypeAttributeService } from '../../../service/goods-type-attribute/goods-type-attribute.service';
import { GoodsAttrService } from '../../../service/goods-attr/goods-attr.service'
import { ToolsService } from '../../../service/tools/tools.service'
import { CreateGoodsDto } from '../../../dto/goods.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/goods`)
@ApiTags('商品')
export class GoodsController {
  constructor(
    private goodsService: GoodsService,
    private goodsImageService: GoodsImageService,
    private goodsTypeAttributeService: GoodsTypeAttributeService,
    private goodsAttrService: GoodsAttrService,
    private toolsService: ToolsService
  ) {}

  @Get()
  @ApiOperation({ summary: '商品列表' })
  async index(@Query() query) {
    // 分页 搜索商品数据
    const {keyword} = query;
    // 条件
    let json = {};
    if (keyword) {
      json = Object.assign(json, {"title": { $regex: new RegExp(keyword) }});
    }

    const page = query.page || 1;
    const pageSize = 3;
    const skip = (page - 1) * pageSize;
    const goodsResult = await this.goodsService.find(json, skip, pageSize)

    const count = await this.goodsService.count(json)

    const totalPages = Math.ceil(count / pageSize);

    return {
      goodsList: goodsResult,
      page,
      totalPages,
      keyword
    }
  }

  @Post()
  @ApiOperation({ summary: '创建商品' })
  @UseInterceptors(FileInterceptor('goods_img'))
  async create(@Body() body: CreateGoodsDto, @UploadedFile() file) {
    const {saveDir} = this.toolsService.uploadFile(file);

    // 1、增加商品数据
    const result = await this.goodsService.create(Object.assign(body, {
      goods_color: body.goods_color.join(','),
      goods_img: saveDir
    }));

    // 2、增加图库
    const {goods_image_list} = body

    if (result._id) {
      for (let i = 0; i < goods_image_list.length; i++) {
        await this.goodsImageService.create({
          goods_id: result._id,
          img_url: goods_image_list[i]
        })
      }
    }

    // 3、增加商品属性
    const {attr_id_list, attr_value_list} = body

    if (result._id) {
      for (let i = 0; i < attr_id_list.length; i++) {
        // 获取当前 商品类型id对应的商品类型属性
        let goodsTypeAttributeResult = await this.goodsTypeAttributeService.find({ _id: attr_id_list[i] });

        this.goodsAttrService.create({
          goods_id: result._id,
          // 可能会用到的字段 开始
          goods_cate_id: result.goods_cate_id,
          attribute_id: attr_id_list[i],
          attribute_type: goodsTypeAttributeResult[0].attr_type,
          // 可能会用到的字段 结束
          attribute_title: goodsTypeAttributeResult[0].title,
          attribute_value: attr_value_list[0],
        })
      }
    }

    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑商品' })
  async update(@Param('id') id: string, @Body() body: CreateGoodsDto) {
    await this.goodsService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品' })
  async remove(@Param('id') id: string) {
    await this.goodsService.delete(id)
    return {
      success: true
    }
  }
}
