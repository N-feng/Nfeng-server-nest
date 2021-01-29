/*
 * @Date: 2021-01-27 14:37:44
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 14:48:02
 * @FilePath: /nfeng-server-nest/apps/admin/src/episodes/episodes.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Episode } from "@libs/db/models/episode.model";

@Injectable()
export class EpisodesService {
  constructor(@InjectModel(Episode) private readonly episodeModel: ModelType<Episode>) {}

  async find(body) {
    return await this.episodeModel.find(body)
  }

  async count(body?) {
    return await this.episodeModel.find(body).count()
  }
}
