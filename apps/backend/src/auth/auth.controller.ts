import { BadRequestException, Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { ResponsePatientDto } from '../patient/dto/response.dto';
import { ResponseUserDto } from '../user/dto/response.dto';
import { UserDec } from '../user/user.decorator';
import { BadRequestResponse, InternalServerErrorResponse } from '../utils/errorResponses';
import { AuthService } from './auth.service';
import { AuthLocalLoginDto } from './dto/localLogin.dto';
import { ResponseAuthGoogleSignInDto } from './dto/responseGoogleSignIn.dto';
import { AuthSignUpDto } from './dto/signUp.dto';
import { GoogleAuthGuard } from './strategies/google';
import JWTGuard from './strategies/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login with an email and a password',
    description: 'This endpoint is used for logging in with an email and password.',
  })
  @ApiBody({ type: AuthLocalLoginDto })
  @ApiOkResponse({ type: ResponseUserDto, description: 'User data' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
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

  @ApiOperation({
    summary: 'Local sign up',
    description: 'This endpoint is used for the local sign up.',
  })
  @ApiBody({ type: AuthSignUpDto })
  @ApiOkResponse({ type: ResponsePatientDto, description: 'Patient data' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post('signup')
  localSignUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUpUser(body);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
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

  @ApiOperation({
    summary: 'Logging out',
    description: 'This endpoint is used for logging out.',
  })
  @ApiBody({ type: AuthLocalLoginDto })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(JWTGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.attachJwtTokenToCookie(res, '');
  }
}
