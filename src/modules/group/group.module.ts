import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupSchema } from './schemas/group.schema';
import { GroupMemberSchema } from './schemas/groupMember.schema';
// import { MemberService } from './member.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'GroupMember', schema: GroupMemberSchema },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
