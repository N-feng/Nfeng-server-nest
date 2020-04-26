import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const pathname = req.path; // 获取访问的地址
    const userinfo = req.session && req.session.userinfo; // 获取session里面保存的用户信息
    if (pathname == `/${Config.adminPath}/auth`
      || pathname == `/${Config.adminPath}/auth/login`) {
      return true;
    } else {
      if (userinfo && userinfo.username) {
        return true;
      } else {
        return false;
      }
    }

  }
}
