import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDTO from './dtos/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.nome, signInDto.senha);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req){
    return req.user;
  }
}
