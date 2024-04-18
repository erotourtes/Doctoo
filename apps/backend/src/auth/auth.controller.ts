import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ResponseGoogleSignDto, ResponseSignUpUserDto } from 'src/auth/dto/google-sign-response.dto';
import { LocalLoginDto } from 'src/auth/dto/local-login.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { GoogleAuthGuard } from 'src/auth/strategies/google-strategy';
import { LocalAuthGuard } from 'src/auth/strategies/local-strategy';
import { UserDec } from 'src/auth/user.decorator';
import { ResponseUserDto } from 'src/user/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async localLogin(
    @Res({ passthrough: true }) res,
    @Body() _: LocalLoginDto,
    @UserDec() user: ResponseUserDto,
  ): Promise<ResponseSignUpUserDto> {
    const token = await this.authService.signJwtToken(user.id);
    this.authService.attachJwtTokenToCookie(res, token.access_token);
    return user;
  }

  @Post('signup')
  localSignup(@Body() createUserDto: SignUpDto) {
    return this.authService.signupUser(createUserDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @Get('login/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(
    @UserDec() data: ResponseGoogleSignDto,
    @Res({ passthrough: true }) res,
  ): Promise<ResponseGoogleSignDto> {
    if (data.isSignedUp) {
      const token = await this.authService.signJwtToken(data.user.id);
      this.authService.attachJwtTokenToCookie(res, token.access_token);
    }

    return data;
  }
}
