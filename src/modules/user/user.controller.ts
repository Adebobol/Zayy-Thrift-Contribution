import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
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
  async getUser(@Request() req) {
    return await this.userService.getUserByEmail(req.body.email);
  }
}
