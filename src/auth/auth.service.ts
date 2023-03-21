import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (! user) {
      throw new BadRequestException('auth/account-not-found');
    }
    const matches: boolean = await bcrypt.compare(password, user.password);
    if (! matches) {
      throw new BadRequestException({
        "statusCode": 100,
        "message": "Please check your username and password"
      });
    }
    delete user.password;
    return user;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('auth/account-exists');
    }

    

    const user: User = await this.userService.create(name, email, password);
    delete user.password;
    return user;
  }


  async checkemail(email: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      return {
        res: 0,
      };
    }
  
    return {
      res: 1,
    };
  }

  async account(token: string) {
    const user = await this.jwtService.verify(token);

    
    return {
      user
    };
  }

  async login(user: User) {
    const payload = { utype: user.utype, name: user.name, email: user.email, sub: user.id  , bisDis: user.bisDis ,  bisName: user.bisName , bisLoc: user.bisLoc ,  notDis: user.notDis ,   phone: user.phone ,   contactmethod: user.contactmethod ,   telephone: user.telephone} ;

    
    return {
      access_token: this.jwtService.sign(payload),
      payload
    };
  }

  


}
