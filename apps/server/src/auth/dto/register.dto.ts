import { ApiPropertyOptional } from "@nestjs/swagger"

export class RegisterDto {
    @ApiPropertyOptional()
    username: string

    @ApiPropertyOptional()
    password: string
}