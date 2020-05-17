import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsTypeAttributeService } from 'src/service/goods-type-attribute/goods-type-attribute.service';
import { CreateGoodsTypeAttributeDto } from 'src/dto/goods_type_attribute.dto';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/goods-type-attribute`)
@ApiTags('商品属性')
export class GoodsTypeAttributeController {
  constructor(private readonly goodsTypeAttributeService: GoodsTypeAttributeService) {}

  @Get(':id')
  @ApiOperation({ summary: '商品属性列表' })
  async index(@Param('id') id: string) {
    return await this.goodsTypeAttributeService.find({cate_id: id})
  }

  @Post()
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
