import { Controller, Get, Post, Body, Request, Put, Param, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsService } from 'src/service/tools/tools.service';
import { UserService } from 'src/admin/user/user.service';
import { CreateUserDto } from 'src/admin/user/dto/user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/user`)
@ApiTags('用户')
export class UserController {
  constructor(private toolsService: ToolsService, private userService: UserService) {}

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
    return { code: 200, data: { list: result } }
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('id') id: string) {
    const user = await this.userService.findOne(id)
    user.password = ''
    return {code: 200, data: user}
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateUserDto) {
    const password = this.toolsService.getMd5(body.password)
    await this.userService.create({...body, password})
    return {code: 200, data: {}}
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() body: CreateUserDto) {
    await this.userService.update(id, body)
    return {code: 200, data: {}}
  }

  @Get('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    this.userService.delete(id)
    return {code: 200, data: {}}
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() body: LoginDto, @Request() req) {
    const password = this.toolsService.getMd5(body.password)
    const userResult = await this.userService.find({...body, password})

    if (userResult.length>0) {
      req.session.userInfo = userResult[0]
      return {code: 200, msg: '登录成功'}
    } else {
      throw new BadRequestException({ code: 400, msg: '用户名或者密码不正确' })
      return {code: 500, msg: '用户名或者密码不正确'}
    }
  }

}
