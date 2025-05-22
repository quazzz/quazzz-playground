import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import UserDto from './dto/User.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {  Request, Response } from 'express';
import RoleDto from './dto/Role.dto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}
    async Register(userDto: UserDto) {
        const user = await this.prisma.user.findFirst({
            where : {
                username: userDto.username
            }
        })
        if(user){
            throw new BadRequestException('User already exists')
        }
        const salt = 10
        const hashy = await bcrypt.hash(userDto.password , salt)
        const newUser = await this.prisma.user.create({
            data: {
                username: userDto.username,
                password: hashy,
                id: String(Date.now()),
                role: "user"
            }
        })
        return newUser
    }
    async Login(res: Response, userDto: UserDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: userDto.username
            }
        })
        if(!user){
            throw new BadRequestException('No user')
        }
        const role = user.role;
        const compare = await bcrypt.compare(userDto.password, user.password)
        if(!compare){
            throw new UnauthorizedException("Wrong password")
        }
        const payload = {username: user?.username, id: user?.id, role: user?.role}
        res.cookie('access_token', await this.jwtService.signAsync(payload), {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 60 * 24,
            path: '/'
        })
        return res.json({ message: "Login succesful", role: role })
    }
    async getRole(req: Request, res: Response){
        const token = req.cookies['access_token']
        if(!token){
            throw new UnauthorizedException('No token')
        }
        try {
            if(!process.env.JWT_SECRET){
                throw new UnauthorizedException("no secret")
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET) as {role: string};
            if(!payload.role){
                throw new UnauthorizedException('Invalid token')
            }
            return res.json({role: payload.role})

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token')
        }
        
    }
   
    
      
}
