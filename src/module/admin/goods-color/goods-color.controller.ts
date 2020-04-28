import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsColorService } from '../../../service/goods-color/goods-color.service';
import { CreateGoodsColorDto } from '../../../dto/goods_color.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/goods-color`)
@ApiTags('商品颜色')
export class GoodsColorController {
  constructor(private readonly goodsColorService: GoodsColorService) {}

  @Get()
  @ApiOperation({ summary: '商品颜色列表' })
  async index() {
    return await this.goodsColorService.find()
  }

  @Post()
  @ApiOperation({ summary: '创建商品颜色' })
  async create(@Body() body: CreateGoodsColorDto) {
    await this.goodsColorService.create(body)
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑商品颜色' })
  async update(@Param('id') id: string, @Body() body: CreateGoodsColorDto) {
    await this.goodsColorService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品颜色' })
  async remove(@Param('id') id: string) {
    await this.goodsColorService.delete(id)
    return {
      success: true
    }
  }
}
