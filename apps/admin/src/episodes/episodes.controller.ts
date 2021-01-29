/*
 * @Date: 2021-01-25 10:05:27
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 14:52:21
 * @FilePath: /nfeng-server-nest/apps/admin/src/episodes/episodes.controller.ts
 */
import { Episode } from "@libs/db/models/episode.model";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { Crud } from "nestjs-mongoose-crud";
import { Course } from "@libs/db/models/course.model";
import { EpisodesService } from './episodes.service';

@Crud({
  model: Episode,
})
@Controller("episodes")
@ApiTags("课时")
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
    private episoderService: EpisodesService
  ) {}

  @Get("option")
  async option() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: "课时管理",
      translate: false,
      column: [
        { prop: "course", label: "所属课程", type: "select", dicData: courses },
        { prop: "name", label: "课时名称" },
        {
          prop: "file",
          label: "视频文件",
          span: 24,
          width: "120px",
          listType: "picture-img",
          type: "upload",
          action: "/upload",
        },
      ],
    };
  }

  @Get('page')
  async page() {
    // 分页
    const pageSize = 10;
    const list = await this.episoderService.find({});
    const count = await this.episoderService.count();
    const total = Math.ceil(count / pageSize)
    return { code: 0, data: { list, total } }
  }
}
