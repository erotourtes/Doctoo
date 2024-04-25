import { BadRequestException, Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponsePatientDto } from '../patient/dto/response.dto';
import { ResponseWithoutRelationsUserDto } from '../user/dto/responseWithoutRelations';
import { UserDec } from '../user/user.decorator';
import { BadRequestResponse, InternalServerErrorResponse } from '../utils/errorResponses';
import { AuthService } from './auth.service';
import { AuthLocalLoginDto } from './dto/localLogin.dto';
import { ResponseAuthGoogleSignInDto } from './dto/responseGoogleSignIn.dto';
import { AuthSignUpPatientDto, AuthSignUpUserDto } from './dto/signUp.dto';
import JWTGuard from './gaurds/jwt.guard';
import { GoogleAuthGuard } from './strategies/google';
import { AuthRequestHelper } from './utils/cookie-helper.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly requestHelper: AuthRequestHelper,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Login with an email and a password',
    description: 'This endpoint is used for logging in with an email and password.',
  })
  @ApiBody({ type: AuthLocalLoginDto })
  @ApiOkResponse({ type: ResponsePatientDto, description: 'User data' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post('login/patient')
  async localLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthLocalLoginDto,
  ): Promise<ResponsePatientDto> {
    const user = await this.authService.validatePatientByEmail(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid email or password');

    const token = await this.authService.signJwtToken(user.id);
    this.requestHelper.attachJwtTokenToCookie(res, token);

    return user;
  }

  @ApiOperation({
    summary: 'Local sign up',
    description: 'This endpoint is used for the local sign up.',
  })
  @ApiBody({ type: ResponseWithoutRelationsUserDto })
  @ApiOkResponse({ type: ResponsePatientDto, description: 'Patient data' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post('signup')
  signUpFirstStep(@Body() body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    return this.authService.signUpUser(body);
  }

  @Post('signup/patient/:token')
  async signUpPatientSecondStep(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthSignUpPatientDto,
    @Param('token') signUpToken: string,
  ): Promise<ResponsePatientDto> {
    const patient = await this.authService.signUpPatient(body, signUpToken);
    const token = await this.authService.signJwtToken(patient.userId);
    this.requestHelper.attachJwtTokenToCookie(res, token);
    return patient;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
  async googleLoginRedirect(@UserDec() data: ResponseAuthGoogleSignInDto, @Res() res: Response) {
    if (data.isLoggedIn && data.user) {
      const token = await this.authService.signJwtToken(data.user.id);
      this.requestHelper.attachJwtTokenToCookie(res, token);
      this.requestHelper.redirectToFrontendHomePage(res);
    } else {
      const token = await this.authService.signGoogleId(data.user.id);
      this.requestHelper.redirectToFrontendSignUpPage(res, token);
    }
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
    this.requestHelper.clearJwtTokenFromCookie(res);
  }
}
