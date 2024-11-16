import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { groupDto } from './dto/group.dto';
import { memebrDto } from './dto/member.dto';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';
import { JwtAuthGuard } from '.././auth/jwt-auth.guard';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async registerGroup(@Body() groupData: groupDto, @Request() req) {
    return await this.groupService.registerGroup(req.user, groupData);
  }

  @Get('search_contrib_type')
  async getGroupByContrib_Type(@Query('contrib_type') params) {
    return this.groupService.getGroupByContrib_type(params);
  }

  @Get('search_with_name')
  async getGroupByName(@Query('name') params) {
    return this.groupService.getGroupByName(params);
  }

  @UseGuards(JwtAuthGuard)
  @Post('join_group/:id')
  async join_group(
    @Param('id') groupId: string,
    @Request() req,
    @Body() memberData: memebrDto,
  ) {
    return await this.groupService.join_group(groupId, req.user);
  }
}
