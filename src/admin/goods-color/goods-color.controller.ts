import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsColorService } from './goods-color.service';
import { CreateGoodsColorDto } from './dto/goods_color.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/goods-color`)
@ApiTags('商品颜色')
export class GoodsColorController {
  constructor(private readonly goodsColorService: GoodsColorService) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品颜色列表' })
  async findAll() {
    const list = await this.goodsColorService.find()
    return {code: 200, data: {list}}
  }

  @Post('findOne')
  @ApiOperation({ summary: '商品颜色详情' })
  async findOne(@Body('id') id: string) {
    const role = await this.goodsColorService.findOne(id)
    return {code: 200, data: role}
  }

  @Post('create')
  @ApiOperation({ summary: '创建商品颜色' })
  async create(@Body() body: CreateGoodsColorDto) {
    await this.goodsColorService.create(body)
    return {code: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '编辑商品颜色' })
  async update(@Body() body: CreateGoodsColorDto) {
    await this.goodsColorService.update(body.id, body)
    return {code: 200, data: {}}
  }

  @Post('delete')
  @ApiOperation({ summary: '删除商品颜色' })
  async delete(@Body('id') id: string) {
    await this.goodsColorService.delete(id)
    return {code: 200, data: {}}
  }
}
