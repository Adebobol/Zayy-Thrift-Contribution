import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signUp')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpData: UserDto) {
    return await this.userService.createUser(signUpData);
  }

  @Get('login')
  async getUserByEmail(@Request() req) {
    return await this.userService.getUserByEmail(req.body.email);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put(':id/update')
  async updateUser(@Param('id') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
