import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { RoleService } from 'src/admin/role/role.service';
import { AccessService } from 'src/admin/access/access.service';

@Controller(`${Config.adminPath}/enum`)
@ApiTags('枚举')
export class EnumController {
  constructor(private roleService: RoleService, private accessService: AccessService) {}

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
}
