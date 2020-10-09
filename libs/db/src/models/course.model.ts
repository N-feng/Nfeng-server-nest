import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Episode } from "./episode.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true }
  },
})
export class Course {
  @ApiProperty({ description: "课程名称" })
  @prop()
  name: string;

  @ApiProperty({ description: "封面图" })
  @prop()
  cover: string;

  @prop({
    ref: 'Episode',
    foreignField: 'course',
    localField: '_id',
  })
  public episodes: Ref<Episode>[];
}
