import {
  Controller,
  Post,
  UseGuards,
  Req,
  UseFilters,
  Body,
  Get,
  Param,
  Headers,
  Put
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { User } from "../user/user.entity";
import { RealIP } from "nestjs-real-ip";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // ip saving process added by nuwan and kanjanan
  @UseGuards(AuthGuard("local-sign-up"))
  @Post("sign-up")
  async signUp(@Req() req: Request, @RealIP() ip: string) {
    return this.authService.login(req.user as User, ip);
  }
  // ip saving process added by nuwan and kanjanan
  @UseGuards(AuthGuard("local-sign-in"))
  @Post("sign-in")
  async login(@Req() req: Request, @RealIP() ip: string) {
    return this.authService.login(req.user as User, ip);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get("check-email/:email")
  async checkemail(@Param("email") email) {
    return this.authService.checkemail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("account")
  async account(@Headers('Authorization') authorizationHeader: string) {
    const token = authorizationHeader.split(' ')[1];
    return this.authService.account(token);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    const userLoginData = await this.authService.findAll();
    return {
      userLoginData,
    };
  }
  @Post('passwordresetlink')
  async sendpasswordresetlink(@Body() data: any , @Req() req: Request) {
  //  console.log(req,99909)
    const base_url=`${req.get('origin')}/`;
    console.log(base_url)
    const response = await this.authService.sendpasswordresetlink(data,base_url);
    return response
  }

  @Get('verifypasswordresetlink/:key')
  async decodemyresettoken(@Param("key") key) {
    console.log(key,898989)
    const response = await this.authService.decodemyresettoken(key);
    console.log(response)
    return response;
  }

  @Put('changepassword/:id')
  async changepassword(@Param('id') id, @Body() data: any) {
    console.log(id)
    return await this.authService.changepassword(id, data);
  }


}
