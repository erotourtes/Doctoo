import { BadRequestException, Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { ResponseUserDto } from '../user/dto/response.dto';
import { UserDec } from '../user/user.decorator';
import { AuthService } from './auth.service';
import { AuthLocalLoginDto } from './dto/localLogin.dto';
import { ResponseAuthGoogleSignInDto } from './dto/responseGoogleSignIn.dto';
import { AuthSignUpDto } from './dto/signUp.dto';
import { GoogleAuthGuard } from './strategies/google';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async localLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthLocalLoginDto,
  ): Promise<ResponseUserDto> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid email or password');
    const token = await this.authService.signJwtToken(user.id);

    this.authService.attachJwtTokenToCookie(res, token);

    return plainToInstance(ResponseUserDto, user);
  }

  @Post('signup')
  localSignUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUpUser(body);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @Get('login/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(
    @UserDec() data: ResponseAuthGoogleSignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthGoogleSignInDto> {
    if (data.isSignedUp) {
      const token = await this.authService.signJwtToken(data.user.id);

      this.authService.attachJwtTokenToCookie(res, token);
    }

    return plainToInstance(ResponseAuthGoogleSignInDto, data);
  }
}
