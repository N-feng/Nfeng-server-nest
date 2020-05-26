import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsCateService } from './goods-cate.service';
import { CreateGoodsCateDto } from './dto/goods_cate.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/goods-cate`)
@ApiTags('商品分类')
export class GoodsCateController {
  constructor(private readonly goodsCateService: GoodsCateService) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品分类列表' })
  async index() {
    const result = await this.goodsCateService.getModel().aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'children'
        }
      },
      {
        $match: {
          'pid': '0'
        }
      }
    ])
    return {code: 200, data: {list: result}}
  }

  @Post('findOne')
  @ApiOperation({ summary: '商品分类详情' })
  async findOne(@Body('id') id: string) {
    const role = await this.goodsCateService.findOne(id)
    return {code: 200, data: role}
  }

  @Post('create')
  @ApiOperation({ summary: '创建商品分类' })
  async create(@Body() body: CreateGoodsCateDto) {
    await this.goodsCateService.create(body)
    return {code: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '更新商品分类' })
  async update(@Body() body: CreateGoodsCateDto) {
    await this.goodsCateService.update(body.id, body)
    return {code: 200, data: {}}
  }

  @Post('delete')
  @ApiOperation({ summary: '删除商品分类' })
  async delete(@Body('id') id: string) {
    await this.goodsCateService.delete(id)
    return {code: 200, data: {}}
  }
}
