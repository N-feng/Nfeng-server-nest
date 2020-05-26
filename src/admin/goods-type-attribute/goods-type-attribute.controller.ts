import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsTypeAttributeService } from 'src/admin/goods-type-attribute/goods-type-attribute.service';
import { CreateGoodsTypeAttributeDto } from 'src/admin/goods-type-attribute/dto/goods_type_attribute.dto';
import { Config } from 'src/config/config';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Controller(`${Config.adminPath}/goods-type-attribute`)
@ApiTags('商品属性')
export class GoodsTypeAttributeController {
  constructor(
    private readonly goodsTypeAttributeService: GoodsTypeAttributeService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品属性列表' })
  async index(@Body('id') id: string) {
    const result = await this.goodsTypeAttributeService.getModel().aggregate([
      {
        $lookup: {
          from: "goods_type",
          localField: "cateId",
          foreignField: "_id",
          as: "cate"
        }
      },
      {
        $match: {
          cateId: new ObjectId(id)
        }
      }
    ])
    const list = result.map((item) => {
      item.cateName = item.cate[0].title
      delete item.cate
      return item
    })
    return { code: 200, data: { list }  }
  }

  @Post('create')
  @ApiOperation({ summary: '创建商品属性' })
  async create(@Body() body: CreateGoodsTypeAttributeDto) {
    await this.goodsTypeAttributeService.create(body)
    return {code: 200, data: {}}
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑商品属性' })
  async update(@Param('id') id: string, @Body() body: CreateGoodsTypeAttributeDto) {
    await this.goodsTypeAttributeService.update(id, body)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品属性' })
  async remove(@Param('id') id: string) {
    await this.goodsTypeAttributeService.delete(id)
    return {code: 200, data: {}}
  }
}
