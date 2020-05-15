import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { ToolsService } from 'src/service/tools/tools.service'

@Controller(`${Config.adminPath}/focus`)
@ApiTags('图片上传')
export class FocusController {
  constructor(private toolsService: ToolsService) {}

  @Post()
  @ApiOperation({ summary: '图片上传' })
  @UseInterceptors(FilesInterceptor('files'))
  async index(@Body() body, @UploadedFiles() files) {
    console.log(body);

    const saveDir = this.toolsService.uploadFile(files[0]);
    console.log(saveDir);

    return '上传成功';
  }
}
