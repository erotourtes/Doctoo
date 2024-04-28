import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserWithoutCredentialsDto } from './dto/patchWithoutCredentials';
import { ResponseUserDto } from './dto/response.dto';
import { UserService } from './user.service';

@ApiTags('User Enpoints')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({ type: ResponseUserDto, description: RESPONSE_STATUS.ERROR })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique user id.' })
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: ResponseUserDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: ResponseUserDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique user id.' })
  @ApiBody({ type: PatchUserWithoutCredentialsDto })
  patchUser(@Param('id') id: string, @Body() body: PatchUserWithoutCredentialsDto) {
    return this.userService.patchUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique user id.' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deletedUser(id);
  }
}
