import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";
import { Episode } from "./episode.model";
import { User } from "./user.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Action {
    @prop({ ref: 'User' })
    user: Ref<User>;

    @prop({enum: ['Course', 'Episode']})
    type: string;

    @prop({ refPath: 'type' })
    object: Ref<Course|Episode>;

    @prop({ enum: ['like', 'upVote'] })
    name: string;
}