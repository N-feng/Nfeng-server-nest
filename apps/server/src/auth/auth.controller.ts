import { User, UserDocument } from "@libs/db/models/user.model";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CurrentUser } from "./current-user.decorator";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
@ApiTags("用户")
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {}

  @Post("register")
  @ApiOperation({ summary: "注册" })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  @Post("login")
  @ApiOperation({ summary: "登录" })
  @UseGuards(AuthGuard("local"))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get("user")
  @ApiOperation({ summary: "获取个人信息" })
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user;
  }
}
