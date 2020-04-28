import { Controller, Get, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../../../config/config';
import { ToolsService } from '../../../service/tools/tools.service'

@Controller(`${Config.adminPath}/focus`)
@ApiTags('图片上传')
export class FocusController {
  constructor(private toolsService: ToolsService) {}

  @Post()
  @ApiOperation({ summary: '图片上传' })
  @UseInterceptors(FilesInterceptor('files'))
  async index(@UploadedFiles() file) {
    console.log(file);

    const saveDir = this.toolsService.uploadFile(file);
    console.log(saveDir);

    return '上传成功';
  }
}
