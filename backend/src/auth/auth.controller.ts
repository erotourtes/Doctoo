import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/strategies/google-strategy';
import { LocalAuthGuard } from 'src/auth/strategies/local-strategy';
import { CreateUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  localLogin(@Request() req, @Body() _: CreateUserDto) {
    return req.user;
  }

  @Post('signup')
  localSignup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupUser(createUserDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin(@Request() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
  googleLoginRedirect(@Request() req) {
    return { message: 'Google login successful' };
  }
}
