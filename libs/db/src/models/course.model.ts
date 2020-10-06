import { ApiProperty } from '@nestjs/swagger'
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Episode } from './episodes.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Course {
    @ApiProperty({ description: '课程名称' })
    @prop()
    name: string

    @ApiProperty({ description: '封面图' })
    @prop()
    cover: string

    @arrayProp({ ref: 'Episode' })
    episodes: Ref<Episode>[]
}