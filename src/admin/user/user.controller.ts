import { Controller, Get, Post, Body, Request, Put, Param, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/admin/user/user.service';
import { ToolsService } from 'src/admin/tools/tools.service';
import { AccessService } from 'src/admin/access/access.service';
import { RoleAccessService } from 'src/admin/role-access/role-access.service';
import { CreateUserDto } from 'src/admin/user/dto/user.dto';
import { LoginDto } from 'src/admin/user/dto/login.dto';
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

@Controller(`${Config.adminPath}/user`)
@ApiTags('用户')
export class UserController {
  constructor(
    private userService: UserService,
    private toolsService: ToolsService,
    private accessService: AccessService,
    private roleAccessService: RoleAccessService
  ) { }

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async index() {
    //获取user表以及role表关联数据
    const result = await this.userService.getModel().aggregate([
      {
        $lookup: {
          from: "role",
          localField: "roleId",
          foreignField: "_id",
          as: "role"
        }
      }
    ])
    const list = result.map((item) => {
      item.roleName = item.role[0].title
      delete item.role
      return item
    })
    return { status: 200, data: { list } }
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('id') id: string) {
    const user = await this.userService.findOne(id)
    user.password = ''
    return { status: 200, data: user }
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateUserDto) {
    const password = this.toolsService.getMd5(body.password)
    await this.userService.create({ ...body, password })
    return { status: 200, data: {} }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() body: CreateUserDto) {
    await this.userService.update(id, body)
    return { status: 200, data: {} }
  }

  @Get('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    this.userService.delete(id)
    return { status: 200, data: {} }
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() body: LoginDto, @Request() req) {
    const password = this.toolsService.getMd5(body.password)
    const userResult = await this.userService.find({ ...body, password })
    if (userResult.length > 0) {
      req.session.userInfo = userResult[0]
      return { status: 200, msg: '登录成功' }
    } else {
      throw new BadRequestException({ code: 400, msg: '用户名或者密码不正确' })
    }
  }

  @Post('findMenus')
  @ApiOperation({ summary: '用户菜单' })
  async findMenus(@Request() req) {
    // 1、获取全部的权限
    const roleId = new ObjectId(req.session.userInfo.roleId)
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

    // 3、循环遍历所有的权限数据,判断当前权限是否在角色权限的数组中,如果是的话给当前数据加入checked属性
    const menus = []
    for (let i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) != -1) {
        // result[i].checked = true
        const { _id, moduleId, actionName } = result[i]
        menus.push({
          id: _id,
          parentId: moduleId,
          actionName,
        })
      }

      for (let j = 0; j < result[i].children.length; j++) {
        if (roleAccessArray.indexOf(result[i].children[j]._id.toString()) != -1 && result[i].children[j].type == 2) {
          // result[i].children[j].checked = true
          const { _id, moduleId, actionName, url } = result[i].children[j]
          menus.push({
            id: _id,
            parentId: moduleId,
            actionName,
            url,
          })
        }
      }
    }

    const returnTree = convert(menus)

    return { status: 200, data: { menus: returnTree.filter((item) => item.children && item.children.length) } }
  }

}
