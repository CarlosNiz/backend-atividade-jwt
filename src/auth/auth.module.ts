import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: 
    [
      UserModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const secret = configService.get<string>('JWT_SECRET');
          if (!secret) {
            throw new Error('A variável de ambiente JWT_SECRET não está definida.');
          }
          return {
            secret: secret,
            signOptions: { expiresIn: '3600s' }, // Tempo de expiração do token
          };
        },
        global: true
      })
    ],
  providers: 
    [
      AuthService,
      {
        provide: APP_GUARD,
        useClass: AuthGuard
      }
    ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
