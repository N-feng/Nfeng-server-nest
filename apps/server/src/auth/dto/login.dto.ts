import { ApiPropertyOptional } from "@nestjs/swagger"

export class LoginDto {
    @ApiPropertyOptional()
    username: string

    @ApiPropertyOptional()
    password: string
}