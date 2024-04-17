import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/strategies/google-strategy';
import { LocalAuthGuard } from 'src/auth/strategies/local-strategy';
import { UserDec } from 'src/auth/user.decorator';
import { CreateUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async localLogin(@Res({ passthrough: true }) res, @Body() _: CreateUserDto, @UserDec() user: any) {
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
  googleLogin(@UserDec() user: any) {
    return user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
  googleLoginRedirect() {
    // This route is specified in the GoogleStrategy
  }
}
