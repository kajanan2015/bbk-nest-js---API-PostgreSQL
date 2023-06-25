import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalSignUpStrategy } from './strategies/local-sign-up.strategy';
import { LocalSignInStrategy } from './strategies/local-sign-in.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  providers: [AuthService, LocalSignInStrategy, LocalSignUpStrategy, JwtStrategy,MailService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
