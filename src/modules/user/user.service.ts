import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async createUser(signUpData: UserDto) {
    if (signUpData.password != signUpData.confirmPassword)
      throw new ForbiddenException({ message: 'Password not same' });
    const newUser = new this.userModel({
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    });
    return await newUser.save();
    // const { password, ...newUserData } = newUser;
    // return newUserData;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
