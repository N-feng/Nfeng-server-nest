import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { GoodsAttrService } from './goods-attr.service';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

@Controller(`${Config.adminPath}/goods-attr`)
@ApiTags('商品类型属性')
export class GoodsAttrController {

  constructor(private readonly goodsAttrService: GoodsAttrService) {}

  @Post('findAll')
  @ApiOperation({ summary: '商品类型属性列表' })
  async findAll(@Body() body) {
    const goodsId = new ObjectId(body.id)
    const result = await this.goodsAttrService.find({goodsId})
    return {status: 200, data: {list: result}}
  }
}
