import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  }

  async getUserByEmail(email: string) {
    if (!email) throw new BadRequestException('No email entered');
    const user = await this.userModel.findOne({ email: email });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException('Users data not available!!');
    }

    return usersData;
  }

  async getUser(userId: string): Promise<User> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser)
      throw new NotFoundException(`User with id ${userId} not found.`);

    return existingUser;
  }

  // async updateUser():Promise<> {}

  async deleteUser(userId: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser)
      throw new NotFoundException(`User with ${userId} not found.`);

    return {
      message: `user with id ${userId} successfully deleted.`,
      data: null,
    };
  }
}
