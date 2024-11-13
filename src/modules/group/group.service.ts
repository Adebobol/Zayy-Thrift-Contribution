import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { groupDto } from './dto/group.dto';
import { Group } from './schemas/group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    private userService: UserService,
  ) {}

  async registerGroup(groupData: groupDto): Promise<Group> {
    const groupCreator = await this.userService.getUser(groupData.admin);
    const { name, ...rest } = groupCreator;
    if (!groupCreator) throw new NotFoundException('Login to create group.');

    const newGroup = new this.groupModel({
      name: groupData.name,
      description: groupData.description,
      admin: name,
      contribType: groupData.contributionType,
    });

    return await newGroup.save();
  }
}
