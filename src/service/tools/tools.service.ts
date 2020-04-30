import { Injectable } from '@nestjs/common';
import { join, extname  } from 'path';
import { createWriteStream } from 'fs';
import { Config } from '../../config/config';
import * as md5 from 'md5'; // MD5加密
import { format } from 'silly-datetime'; // 格式化日期
import * as mkdirp from 'mkdirp'; // 创建目录

@Injectable()
export class ToolsService {

  getMd5(str:string) {
    return md5(str);
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  uploadFile(file) {
    /*
      1、获取当前日期 20200428
      2、根据日期创建目录
      3、实现上传
      4、返回图片保存的地址
    */

    // 1、获取当前日期 20200428
    const day = format(new Date(), 'YYYYMMDD'); // 目录名称
    const d = this.getTime(); // 时间戳 当前图片的名称

    // 2、根据日期创建目录
    const dir = join(__dirname, `../../../public/${Config.uploadDir}`, day);
    mkdirp.sync(dir);

    // 3、实现上传
    // const uploadDir = join(dir, d+extname(file.originalname));
    const uploadDir = join(dir, file.originalname);
    const writeImage = createWriteStream(uploadDir);
    writeImage.write(file.buffer);

    // 4、返回图片保存的地址
    // const saveDir = join(Config.uploadDir, day, d+extname(file.originalname));
    const saveDir = join(Config.uploadDir, day, file.originalname);

    return {
      saveDir,
      uploadDir
    };

  }

}
