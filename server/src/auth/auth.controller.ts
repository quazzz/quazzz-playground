import { Body, Controller, Post, Res, Req, Get } from '@nestjs/common';
import UserDto from './dto/User.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    Register(@Body() userDto: UserDto ){
        
        return this.authService.Register(userDto)
    }
    @Post('login')
    Login(@Body() userDto: UserDto, @Res() res: Response){
        return this.authService.Login(res, userDto)
    }
    @Get('whoami')
    getRole(@Req() req: Request, @Res() res: Response){
        return this.authService.getRole(req, res)
    }
}
