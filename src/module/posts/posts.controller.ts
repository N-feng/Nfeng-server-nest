import { Controller, Get, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Config } from '../../config/config';

class CreatePostDto {
  @ApiPropertyOptional({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({message: '请填写标题'})
  title: string
  @ApiPropertyOptional({ description: '帖子内容', example: '帖子内容1' })
  content: string
}

@Controller(`${Config.adminPath}/posts`)
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>
  ) { }


  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  async index() {
    return await this.postModel.find()
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postModel.create(createPostDto)
    return {code: 200, data: {}}
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({summary: '编辑帖子'})
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({summary: '删除帖子'})
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id)
    return {code: 200, data: {}}
  }
}
