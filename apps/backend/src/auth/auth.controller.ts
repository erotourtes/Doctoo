import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ResponseGoogleSignDto } from 'src/auth/dto/google-sign-response.dto';
import { LocalLoginDto } from 'src/auth/dto/local-login.dto';
import { GoogleAuthGuard } from 'src/auth/strategies/google-strategy';
import { LocalAuthGuard } from 'src/auth/strategies/local-strategy';
import { UserDec } from 'src/auth/user.decorator';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { ResponseUserDto } from 'src/user/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async localLogin(@Res({ passthrough: true }) res, @Body() _: LocalLoginDto, @UserDec() user: ResponseUserDto) {
    const token = await this.authService.signJwtToken(user.id);
    this.authService.attachJwtTokenToCookie(res, token.access_token);
    return user;
  }

  @Post('signup')
  localSignup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupUser(createUserDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @Get('login/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleLoginRedirect(@UserDec() data: ResponseGoogleSignDto): ResponseGoogleSignDto {
    return data;
  }
}
