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
import { ResponseWithoutRelationsUserDto } from '../user/dto/responseWithoutRelations';
import { UserDec } from '../user/user.decorator';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthLocalLoginDto, TwoFactorAuthDto } from './dto/localLogin.dto';
import { GetMePatientResponseDto, GoogleSignInResponseDto, LocalLoginResponseDto } from './dto/response.dto';
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
  @ApiOkResponse({
    type: LocalLoginResponseDto,
    description: 'Returns token in cookie & if client needs to verify (2fa) via email',
  })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post('login/patient')
  async localLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthLocalLoginDto,
  ): Promise<LocalLoginResponseDto> {
    const { is2faEnabled, patient } = await this.authService.validatePatientByEmail(body.email, body.password);
    if (!patient) throw new BadRequestException('Invalid email or password');

    if (!is2faEnabled) {
      const token = await this.authService.signJwtToken(patient.userId);
      this.requestHelper.attachJwtTokenToCookie(res, token);
    }
    return { is2faEnabled };
  }

  @ApiBody({ type: TwoFactorAuthDto })
  @ApiOkResponse({ type: undefined, description: 'Returns token in cookie' })
  @Post('login/patient/2fa')
  async verify2fa(@Res({ passthrough: true }) res: Response, @Body() body: TwoFactorAuthDto): Promise<void> {
    const user = await this.authService.verify2fa(body);
    const token = await this.authService.signJwtToken(user.id);
    this.requestHelper.attachJwtTokenToCookie(res, token);
  }

  @ApiOperation({
    summary: 'Local sign up (first step)',
    description: 'This endpoint is used for the local sign up.',
  })
  @ApiBody({ type: AuthSignUpUserDto })
  @ApiOkResponse({ type: undefined, description: 'Sends verification mail for second step' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post('signup')
  async signUpFirstStep(@Body() body: AuthSignUpUserDto): Promise<void> {
    await this.authService.signUpUser(body);
  }

  @ApiOperation({
    summary: 'Local sign up (second step)',
    description: 'This endpoint is used for finishing the local sign up.',
  })
  @ApiBody({ type: AuthSignUpPatientDto })
  @ApiOkResponse({ type: undefined, description: 'Returns token in cookie' })
  @Post('signup/patient/:token')
  async signUpPatientSecondStep(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthSignUpPatientDto,
    @Param('token') signUpToken: string,
  ): Promise<void> {
    const patient = await this.authService.signUpPatient(body, signUpToken);
    const token = await this.authService.signJwtToken(patient.userId);
    this.requestHelper.attachJwtTokenToCookie(res, token);
  }

  @ApiOperation({ summary: 'Google sign up/login' })
  @ApiOkResponse({ type: undefined, description: 'Returns token in cookie' })
  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
  async googleLoginRedirect(@UserDec() data: GoogleSignInResponseDto, @Res() res: Response) {
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
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @UseGuards(JWTGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.requestHelper.clearJwtTokenFromCookie(res);
  }

  @ApiBody({ type: ChangePasswordDto })
  @ApiInternalServerErrorResponse({ type: BadRequestException })
  @UseGuards(JWTGuard)
  @Post('change-password')
  changePassword(@Body() body: ChangePasswordDto, @UserDec() user: ResponseWithoutRelationsUserDto) {
    return this.authService.changePassword(user, body);
  }

  @ApiOkResponse({ type: GetMePatientResponseDto })
  @UseGuards(JWTGuard)
  @Get('getme/patient')
  async getPatient(@UserDec() user: ResponseWithoutRelationsUserDto): Promise<GetMePatientResponseDto> {
    return await this.authService.getMePatient(user);
  }
}
