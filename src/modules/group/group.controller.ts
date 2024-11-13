import { Controller, Get, Post, Request, Body } from '@nestjs/common';
import { groupDto } from './dto/group.dto';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/register')
  async registerGroup(@Body() groupData: groupDto): Promise<Group> {
    return await this.groupService.registerGroup(groupData);
  }
}
