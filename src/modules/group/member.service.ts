// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { memebrDto } from './dto/member.dto';
// import { GroupMember } from './schemas/groupMember.schema';

// @Injectable()
// export class MemberService {
//   constructor(
//     @InjectModel(GroupMember.name)
//     private readonly memberModel: Model<GroupMember>,
//   ) {}

//   async register_as_group_member(memberData: memebrDto) {
//     const newMember = await new this.memberModel({
//       memberData,
//     });

//     return newMember.save();
//   }
// }
