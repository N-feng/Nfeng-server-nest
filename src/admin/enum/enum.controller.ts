import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { RoleService } from 'src/admin/role/role.service';
import { AccessService } from 'src/admin/access/access.service';
import { GoodsCateService } from 'src/admin/goods-cate/goods-cate.service';

@Controller(`${Config.adminPath}/enum`)
@ApiTags('枚举')
export class EnumController {
  constructor(
    private readonly roleService: RoleService,
    private readonly accessService: AccessService,
    private readonly goodsCateService: GoodsCateService,
  ) {}

  @Post('findRoles')
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

  @Post('findModules')
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

  @Post('findGoodsCate')
  @ApiOperation({ summary: '商品分类枚举' })
  async index() {
    const result = await this.goodsCateService.find({'pid': '0'})
    const list = [{
      label: '顶级分类',
      value: '0'
    },...result.map((item) => {
      return {
        label: item.title,
        value: item._id,
      }
    })]
    return {code: 200, data: { list }}
  }
}
