import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { GetUserGuard } from './guards/get.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GetUserGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @UseGuards(GetUserGuard)
  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() body: PatchUserDto) {
    return this.userService.patchUser(id, body);
  }

  @UseGuards(GetUserGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deletedUser(id);
  }
}
