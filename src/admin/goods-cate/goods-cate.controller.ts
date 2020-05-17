import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsCateService } from '../../service/goods-cate/goods-cate.service';
import { CreateGoodsCateDto } from '../../dto/goods_cate.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/goods-cate`)
@ApiTags('商品分类')
export class GoodsCateController {
  constructor(private readonly goodsCateService: GoodsCateService) {}

  @Get()
  @ApiOperation({ summary: '商品分类列表' })
  async index() {
    const result = await this.goodsCateService.getModel().aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items'
        }
      },
      {
        $match: {
          'pid': '0'
        }
      }
    ])
    return result
  }

  @Post()
  @ApiOperation({ summary: '创建商品分类' })
  async create(@Body() body: CreateGoodsCateDto) {
    await this.goodsCateService.create(body)
    return {code: 200, data: {}}
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑商品分类' })
  async update(@Param('id') id: string, @Body() body: CreateGoodsCateDto) {
    await this.goodsCateService.update(id, body)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品分类' })
  async remove(@Param('id') id: string) {
    await this.goodsCateService.delete(id)
    return {code: 200, data: {}}
  }
}
