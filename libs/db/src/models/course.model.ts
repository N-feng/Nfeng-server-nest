import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop } from '@typegoose/typegoose'

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
}