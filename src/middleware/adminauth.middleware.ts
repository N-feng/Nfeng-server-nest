import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Config } from 'src/config/config';
import { RoleAccessService } from '../service/role-access/role-access.service'

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private roleAccessService: RoleAccessService) { }
  async use(req: any, res: any, next: () => void) {
    const pathname = req.baseUrl; // 获取访问的地址
    const userInfo = req.session && req.session.userInfo;
    if (userInfo && userInfo.username) {
      // 设置全局变量
      res.locals.userInfo = userInfo
      next()
      // 接口权限判断
      // const hasAuth = await this.roleAccessService.checkAuth(req)
      // if (hasAuth) {
      //   next()
      // } else {
      //   throw new UnauthorizedException({code: 401, msg: '401 Unauthorized'})
      // }
    } else {
      // 排除不需要做权限判断的页面
      if (pathname == `/${Config.adminPath}/user/login` || pathname == `/${Config.adminPath}/login/code` || pathname == `/${Config.adminPath}/doLogin`) {
        next()
      } else {
        throw new UnauthorizedException({ code: 401, msg: '401 Unauthorized' })
      }
    }
  }
}
