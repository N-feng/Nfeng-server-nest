import { Injectable } from '@nestjs/common';

// MD5加密
import * as md5 from 'md5'

@Injectable()
export class ToolsService {

  getMd5(str:string) {
    return md5(str);
  }

  success(msg = '', data = {}) {
    return {
      code: 200,
      data,
      msg
    }
  }

  async error(res, message) {
    await res.render()
  }

}
