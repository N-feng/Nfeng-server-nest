import { Controller, Get, Post, Body, Request, Put, Param, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsService } from 'src/service/tools/tools.service';
import { AuthService } from 'src/service/auth/auth.service';
import { CreateAuthDto } from 'src/dto/auth.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/auth`)
@ApiTags('用户')
export class AuthController {
  constructor(private toolsService: ToolsService, private authService: AuthService) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async index() {
    //获取auth表以及role表关联数据
    const result = await this.authService.getModel().aggregate([
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
    const auth = await this.authService.findOne(id)
    auth.password = ''
    return {code: 200, data: auth}
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateAuthDto) {
    const password = this.toolsService.getMd5(body.password)
    await this.authService.create({...body, password})
    return {code: 200, data: {}}
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() body: CreateAuthDto) {
    await this.authService.update(id, body)
    return {code: 200, data: {}}
  }

  @Get('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    this.authService.delete(id)
    return {code: 200, data: {}}
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() body: LoginDto, @Request() req) {
    const password = this.toolsService.getMd5(body.password)
    const userResult = await this.authService.find({...body, password})

    if (userResult.length>0) {
      req.session.userInfo = userResult[0]
      return {code: 200, msg: '登录成功'}
    } else {
      throw new BadRequestException({ code: 400, msg: '用户名或者密码不正确' })
      return {code: 500, msg: '用户名或者密码不正确'}
    }
  }

}
