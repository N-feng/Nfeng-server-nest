import { Controller, Get, Post, Body, Request, Delete, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsService } from './../../../service/tools/tools.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CreateAuthDto } from '../../../dto/create-auth.dto';
import { LoginDto } from '../../../dto/login.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/auth`)
@ApiTags('用户')
export class AuthController {
  constructor(private toolsService: ToolsService, private authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: '用户列表' })
  async index() {
    //获取auth表以及role表关联数据
    var result=await this.authService.getModel().aggregate([
      {
        $lookup: {
          from: "role",
          localField: "role_id",
          foreignField: "_id",
          as: "role"
        }
      }
    ])

    // console.log(JSON.stringify(result))

    return {
      authResult:result
    }
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateAuthDto) {
    const password = this.toolsService.getMd5(body.password)
    await this.authService.create({...body, password})
    return {
      success: true
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() body: CreateAuthDto) {
    await this.authService.update(id, body)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    this.authService.delete(id)
    return {
      success: true
    }
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() body: LoginDto, @Request() req) {
    const password = this.toolsService.getMd5(body.password)
    const userResult = await this.authService.find({...body, password})

    if (userResult.length>0) {
      req.session.userinfo = userResult[0]
      return {
        success: true,
        msg: '登录成功'
      };
    } else {
      return {
        success: true,
        msg: '用户名或者密码不正确'
      };
    }
  }

}
