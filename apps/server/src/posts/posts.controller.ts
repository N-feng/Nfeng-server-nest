import { Controller, Get, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Config } from '../config/config';

import { Crud } from 'nestjs-mongoose-crud'

class CreatePostDto {
  @ApiPropertyOptional({ description: '帖子标题1', example: '帖子标题1' })
  @IsNotEmpty({message: '请填写标题'})
  title: string
  @ApiPropertyOptional({ description: '帖子内容1', example: '帖子内容1' })
  content: string
}

@Crud({
  model: PostSchema,
  routes: {
    find: {
      decorators: [
        ApiOperation({ summary: '帖子列表' })
      ]
    },
    create: {
      dto: CreatePostDto
    }
  }
})
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema) public model: ModelType<PostSchema>
  ) { }
}
