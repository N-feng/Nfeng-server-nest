import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Config } from '../../config/config';
import { RoleService } from '../role/role.service';
import { AccessService } from '../access/access.service';
import { GoodsCateService } from '../goods-cate/goods-cate.service';
import { GoodsColorService } from '../goods-color/goods-color.service';
import { GoodsTypeService } from '../goods-type/goods-type.service'

@Controller(`${Config.adminPath}/enum`)
@ApiTags('枚举')
export class EnumController {
  constructor(
    private readonly roleService: RoleService,
    private readonly accessService: AccessService,
    private readonly goodsCateService: GoodsCateService,
    private readonly goodsColorService: GoodsColorService,
    private readonly goodsTypeService: GoodsTypeService,
  ) {}

  @Get('findRoles')
  @ApiOperation({ summary: '角色枚举' })
  async findRoles() {
    const result = await this.roleService.find()
    const list = [
      ...result.map((item) => {
        return {
          label: item.title,
          value: item._id,
        }
      })
    ]
    return { code: 200, data: { list } }
  }

  @Get('findModules')
  @ApiOperation({ summary: '模块枚举' })
  async findModules() {
    const result = await this.accessService.getModel().aggregate([
      {
        $match: {
          moduleId: '0'
        }
      }
    ])
    const list = [{
      label: '顶级模块',
      value: '0'
    },...result.map((item) => {
      return {
        label: item.moduleName,
        value: item._id,
      }
    })]
    return { code: 200, data: { list } }
  }

  @Get('findGoodsCate')
  @ApiOperation({ summary: '商品分类枚举' })
  async findGoodsCate(@Body() body) {
    // console.log(body)
    const result = await this.goodsCateService.find(body)
    const list = result.map((item) => ({
      label: item.title,
      value: item._id,
    }))
    if (body.pid && body.pid === '0') {
      list.unshift({ label: '顶级分类', value: '0' })
    }
    return {code: 200, data: { list }}
  }

  @Get('findGoodsColor')
  @ApiOperation({ summary: '商品颜色枚举' })
  async findGoodsColor(@Body() body) {
    const result = await this.goodsColorService.find(body)
    const list = result.map((item) => ({
      label: item.colorName,
      value: item.colorValue
    }))
    return {code: 200, data: { list }}
  }

  @Get('findGoodsType')
  @ApiOperation({ summary: '商品分类枚举' })
  async findGoodsType(@Body() body) {
    const result = await this.goodsTypeService.find(body)
    const list = result.map((item) => ({
      label: item.title,
      value: item._id,
    }))
    return {code: 200, data: { list }}
  }

}
