import { IsEmail, IsNotEmpty, MinLength, IsString } from "@nestjs/class-validator"
export default class{
    @IsString()
    @IsNotEmpty()
    username: string
    @MinLength(8)
    @IsString()
    password: string
}