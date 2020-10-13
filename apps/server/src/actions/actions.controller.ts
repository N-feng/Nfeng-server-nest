import { Action } from '@libs/db/models/action.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('actions')
export class ActionsController {
    constructor(
        @InjectModel(Action) private actionModel: ReturnModelType<typeof Action>
    ) {}

    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    async getStatus(@Query() dto, @CurrentUser() user) {
        dto.user = user._id
        const count = await this.actionModel.countDocuments(dto)
        return {
            status: count > 0
        }
    }

    @Post('toggle')
    @UseGuards(AuthGuard('jwt'))
    async toggle(@Body() dto, @CurrentUser() user) {
        dto.user = user._id
        const ret = await this.getStatus(dto, user)
        if (ret.status) {
            await this.actionModel.deleteMany(dto)
        } else {
            await this.actionModel.create(dto)
        }
        return await this.getStatus(dto, user)
    }
}
