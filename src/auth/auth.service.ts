import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (! user) {
      throw new BadRequestException('auth/account-not-found');
      
    }
    const matches: boolean = await bcrypt.compare(password, user.password);
    if (! matches) {
      throw new BadRequestException({
        "statusCode": 200,
        "message": "Please check your username 2 and password"
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

    
// we assign 0 for add value to emp id column, because we use same login for employee and admin- added by nuwan
    // const user: User = await this.userService.create(name, email, password,"",null,null);
    // delete user.password;
    // return user;
    return 
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
// ip saving process added by nuwan and kanjanan
  async login(user: User, ip) {
    const data = {
      username:user.email,
      ipAddress:ip,
      userid:user.id
    };
    await this.authRepository.save(data)
    const payload = { utype: user.uType, name: user.firstName, email: user.email, sub: user.id } ;

    
    return {
      access_token: this.jwtService.sign(payload),
      payload
    };
  }

  async findAll(): Promise<AuthEntity[]> {
    return await this.authRepository.find();
  }

  async find(id: number): Promise<AuthEntity> {
    return await this.authRepository.findOne({ where: { id } });
  }

}
