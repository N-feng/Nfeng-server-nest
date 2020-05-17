import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsTypeService } from '../../service/goods-type/goods-type.service';
import { CreateGoodsTypeDto } from '../../dto/goods_type.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/goods-type`)
@ApiTags('商品类型')
export class GoodsTypeController {
  constructor(private readonly goodsTypeService: GoodsTypeService) {}

  @Get()
  @ApiOperation({ summary: '商品类型列表' })
  async index() {
    return await this.goodsTypeService.find()
  }

  @Post()
  @ApiOperation({ summary: '创建商品类型' })
  async create(@Body() body: CreateGoodsTypeDto) {
    await this.goodsTypeService.create(body)
    return {code: 200, data: {}}
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑商品类型' })
  async update(@Param('id') id: string, @Body() body: CreateGoodsTypeDto) {
    await this.goodsTypeService.update(id, body)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品类型' })
  async remove(@Param('id') id: string) {
    await this.goodsTypeService.delete(id)
    return {code: 200, data: {}}
  }
}
