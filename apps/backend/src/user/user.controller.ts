import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserWithoutCredentialsDto } from './dto/patch.dto';
import { ResponseUserDto } from './dto/response.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'This endpoint retrieves a user object by ID.',
  })
  @ApiParam({ name: 'id', description: 'User ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseUserDto, description: 'User exists' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'User not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Create a new user',
    description: 'This endpoint creates a new user.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: ResponseUserDto, description: 'User created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'This endpoint updates a user object by ID.',
  })
  @ApiParam({ name: 'id', description: 'User ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: PatchUserWithoutCredentialsDto })
  @ApiOkResponse({ type: ResponseUserDto, description: 'User updated' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'User not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() body: PatchUserWithoutCredentialsDto) {
    return this.userService.patchUser(id, body);
  }

  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'This endpoint deletes a user object by ID.',
  })
  @ApiParam({ name: 'id', description: 'User ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'User not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deletedUser(id);
  }
}
