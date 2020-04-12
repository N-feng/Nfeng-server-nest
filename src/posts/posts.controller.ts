import { PostModel } from './post.model';
import { Controller, Get, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';

class CreatePostDto {
  @ApiPropertyOptional({ description: '帖子标题', example: '帖子标题1' })
  title: string
  @ApiPropertyOptional({ description: '帖子内容', example: '帖子内容1' })
  content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  async index() {
    return await PostModel.find()
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await PostModel.create(createPostDto)
    return {
      success: true
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    return await PostModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({summary: '编辑帖子'})
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await PostModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({summary: '删除帖子'})
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
