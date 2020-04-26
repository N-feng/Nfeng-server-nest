import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from 'src/config/config';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    next()

    // const pathname = req.baseUrl; // 获取访问的地址
    // const userinfo = req.session && req.session.userinfo; // 获取session里面保存的用户信息
    // if (userinfo && userinfo.username) {
    //   next();
    // } else {
    //   if (pathname == `/${Config.adminPath}/login`
    //     || pathname == `/${Config.adminPath}/login/code`
    //     || pathname == `/${Config.adminPath}/doLogin`) {
    //       next();
    //   } else {
    //     console.log('重定向到登录页面');
    //     return {
    //       code: 401
    //     }
    //   }
    // }

  }
}
