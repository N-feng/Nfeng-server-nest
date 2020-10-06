import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsTypeService } from './goods-type.service';
import { CreateGoodsTypeDto } from './dto/goods_type.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/goods-type`)
@ApiTags('商品类型')
export class GoodsTypeController {
  constructor(private readonly goodsTypeService: GoodsTypeService) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品类型列表' })
  async index() {
    const res = await this.goodsTypeService.find()
    return {code: 200, data: { list: res }}
  }

  @Post('create')
  @ApiOperation({ summary: '创建商品类型' })
  async create(@Body() body: CreateGoodsTypeDto) {
    await this.goodsTypeService.create(body)
    return {code: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '编辑商品类型' })
  async update(@Body() body: CreateGoodsTypeDto) {
    await this.goodsTypeService.update(body.id, body)
    return {code: 200, data: {}}
  }

  @Post('delete')
  @ApiOperation({ summary: '删除商品类型' })
  async delete(@Body('id') id: string) {
    await this.goodsTypeService.delete(id)
    return {code: 200, data: {}}
  }
}
