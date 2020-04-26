import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';
import { LoginDto } from '../../../dto/login.dto';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/login`)
@ApiTags('登录')
export class LoginController {
    constructor(private toolsService: ToolsService, private adminService: AdminService) {}

    @Post()
    async login(@Body() body: LoginDto, @Request() req) {
      const password = this.toolsService.getMd5(body.password)
      const userResult = await this.adminService.find({...body, password})

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
