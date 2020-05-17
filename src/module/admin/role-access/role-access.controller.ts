
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessService } from 'src/service/access/access.service';
import { RoleAccessService } from 'src/service/role-access/role-access.service';
import { CreateRoleAccessDto } from 'src/dto/role_access.dto';
import { Config } from 'src/config/config';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

function convert(list) {
  const res = [];
  const map = list.reduce((res, v) => (res[v.id] = v, res), {});
  for (const item of list) {
    if (item.parentId === '0') {
      res.push(item);
      continue;
    }
    if (item.parentId in map) {
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}

@Controller(`${Config.adminPath}/role-access`)
@ApiTags('授权')
export class RoleAccessController {
  constructor(
    private accessService: AccessService,
    private roleAccessService: RoleAccessService
  ) { }

  @Post('findOne')
  @ApiOperation({ summary: '查询角色权限' })
  async findOne(@Body('id') id: string) {

    // 1、获取全部的权限
    const roleId = new ObjectId(id)
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'moduleId',
          as: 'children'
        }
      },
      {
        $match: {
          "moduleId": '0'
        }
      }
    ])

    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    const accessResult = await this.roleAccessService.find({ roleId })
    const roleAccessArray = []
    accessResult.forEach((value) => {
      roleAccessArray.push(value.accessId.toString())
    });

    const menus = []

    // 3、循环遍历所有的权限数据,判断当前权限是否在角色权限的数组中,如果是的话给当前数据加入checked属性
    for (let i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) != -1) {
        // result[i].checked = true
        const {_id, moduleId, actionName} = result[i]
        menus.push({
          id: _id,
          parentId: moduleId,
          actionName,
        })
      }

      for (let j = 0; j < result[i].children.length; j++) {
        if (roleAccessArray.indexOf(result[i].children[j]._id.toString()) != -1) {
          // result[i].children[j].checked = true
          const {_id, moduleId, actionName} = result[i].children[j]
          menus.push({
            id: _id,
            parentId: moduleId,
            actionName,
          })
        }
      }
    }

    return { code: 200, data: { list: roleAccessArray, menus: convert(menus) } }
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色权限' })
  async update(@Body() body: CreateRoleAccessDto) {
    const roleId = new ObjectId(body.roleId)

    const { accessNode } = body

    // 1、删除当前角色下面的所有权限

    await this.roleAccessService.deleteMany({ roleId })

    // 2、把当前角色对应的所有权限增加到role_access表里面

    for (let i = 0; i < accessNode.length; i++) {
      await this.roleAccessService.create({
        roleId,
        accessId: accessNode[i]
      })
    }

    return { code: 200, data: {} }
  }

}
