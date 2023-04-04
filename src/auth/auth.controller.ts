import { Controller, Post, UseGuards, Req, UseFilters , Body , Get , Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
// ip saving process added by nuwan and kanjanan
  @UseGuards(AuthGuard('local-sign-up'))
  @Post('sign-up')
  async signUp(@Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.authService.login(req.user as User,ip);
  }
// ip saving process added by nuwan and kanjanan
  @UseGuards(AuthGuard('local-sign-in'))
  @Post('sign-in')
  async login(@Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.authService.login(req.user as User,ip);
    
  }


  @Get('check-email/:email')
  async checkemail(@Param('email') email) {
    return this.authService.checkemail(email);
  }

  @Get('account')
  async account(@Req() req: Request) {

    const header = req.headers;

    return this.authService.account(header.authorization);
  }

  @Get()
  async findAll() {
    const companies =  await this.authService.findAll();
    return {
      companies
    };
  }


}
