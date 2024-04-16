import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/strategies/google-strategy';
import { LocalAuthGuard } from 'src/auth/strategies/local-strategy';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  localLogin(@Request() req) {
    return req.user;
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
