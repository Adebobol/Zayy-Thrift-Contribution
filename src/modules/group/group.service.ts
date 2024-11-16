import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { groupDto } from './dto/group.dto';
import { memebrDto } from './dto/member.dto';
import { Group } from './schemas/group.schema';
import { GroupMember } from './schemas/groupMember.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(GroupMember.name)
    private readonly memberModel: Model<GroupMember>,
    private userService: UserService,
  ) {}

  async registerGroup(userData, groupData: groupDto) {
    const creator = await this.userService.getUser(userData.id);

    const newGroup = new this.groupModel({
      name: groupData.name,
      description: groupData.description,
      admin: userData.id,
      contribType: groupData.contributionType,
    });

    return await newGroup.save();
  }

  async getGroupByContrib_type(queryParams) {
    const contrib_type_data = await this.groupModel.find({
      contribType: queryParams,
    });

    return contrib_type_data;
  }

  async getGroupByName(queryParams) {
    const allGroups = await this.groupModel.find();

    const with_name_data = allGroups.filter((group) =>
      group.name.toLowerCase().includes(queryParams),
    );
    return with_name_data;
  }

  async join_group(groupId: string, member) {
    const groupInfo = await this.groupModel.findById(groupId);
    if (!groupInfo) throw new NotFoundException('Group not found');
    if (groupInfo.admin == member.id) {
      const newMember = new this.memberModel({
        group: groupId,
        nameOfMember: member.id,
        position: 'Member',
      });
      return await newMember.save();
    }
    //   throw new BadRequestException('Admin already a member.');

    // const newMember = new this.memberModel({
    //   group: groupId,
    //   nameOfMember: member.id,
    // });
    // return newMember;
  }
}
