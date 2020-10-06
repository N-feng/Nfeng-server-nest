import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../../config/config';
import { FocusService } from './focus.service';
import { ToolsService } from '../tools/tools.service';
import { CreateFocusDto } from './dto/focus.dto';

@Controller(`${Config.adminPath}/focus`)
@ApiTags('图片上传')
export class FocusController {
  constructor(private toolsService: ToolsService, private focusService: FocusService) {}

  @Post('upload')
  @ApiOperation({ summary: '图片上传' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() body, @UploadedFile() file) {

    const {saveDir} = this.toolsService.uploadFile(file)

    return { code: 200, msg: '上传成功', data: { url: `/${saveDir}` } }
  }

  @Post('findAll')
  @ApiOperation({ summary: '图片列表' })
  async findAll() {
    const result = await this.focusService.find({})
    return { code: 200, data: { list: result } }
  }

  @Post('findOne')
  @ApiOperation({ summary: '图片详情' })
  async findOne(@Body('id') id: string) {
    const role = await this.focusService.findOne(id)
    return {code: 200, data: role}
  }

  @Post('create')
  @ApiOperation({ summary: '创建图片' })
  async create(@Body() body: CreateFocusDto) {
    await this.focusService.create(body)
    return { code: 200, data: {} }
  }

  @Post('update')
  @ApiOperation({ summary: '更新图片' })
  async update(@Body() body: CreateFocusDto) {
    await this.focusService.update(body.id, body)
    return {code: 200, data: {}}
  }
}
