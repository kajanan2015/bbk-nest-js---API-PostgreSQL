import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { MailService } from 'src/mail/mail.service';
import { refreshTokenSecret } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly mailservice: MailService
  ) { }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log('master')
      throw new BadRequestException('auth/account-not-found');

    }
    const matches: boolean = await bcrypt.compare(password, user.password);
    if (!matches) {
      throw new BadRequestException({
        "statusCode": 200,
        "message": "Please check your username 2 and password"
      });
    }
    delete user.password;
    return user;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userService.findByEmailexist(email);
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
    const existing = await this.userService.findByEmailexist(email);
    if (existing) {
      return {
        res: 0,
      };
    }

    return {
      res: 1,
    };
  }


  async activatedcheckemail(email: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      return existing;
    }

    return false;
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
      username: user.email,
      ipAddress: ip,
      userid: user.id
    };
    await this.authRepository.save(data)
    const payload = { utype: user.uType, name: user.firstName, email: user.email, sub: user.id, firstpasswordset: user.firsttimepasswordchange,profilePicture:user.profilePicThumb };
    let companies=await this.userService.getCompaniesByUserId(user.id)
    return {
      refreshtoken: this.jwtService.sign(payload),
      access_token: this.jwtService.sign(
        { userId: payload.sub, refresh: true },
        { expiresIn: '7d' }
      ),
      payload,
      companies
    };
    
  }

  async findAll(): Promise<AuthEntity[]> {
    return await this.authRepository.find();
  }

  async find(id: number): Promise<AuthEntity> {
    return await this.authRepository.findOne({ where: { id } });
  }

  // send password resetlink
  async sendpasswordresetlink(data,base_url){
    const accountemail = data.email;
    const checkemail = await this.activatedcheckemail(accountemail)
    if (checkemail) {
      return await this.mailservice.sendresetlink(checkemail['email'], checkemail['id'],base_url);
    }
    return 302
  }

  async decodemyresettoken(key) {
    const decoderesult = await this.mailservice.decodemyresettoken(key);
    return decoderesult;
  }
  async changepassword(id,data){
    return await this.userService.changepassword(id,data)
  }

}
