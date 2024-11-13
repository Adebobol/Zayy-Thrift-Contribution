import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Group, PositionType } from './group.schema';

@Schema({
  timestamps: true,
})
export class GroupMember {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: Group;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  nameOfMember: User;

  @Prop()
  position: PositionType.member;

  @Prop()
  timeOfContribution: string;

  @Prop()
  amountPerContribution: string;

  @Prop()
  totalAmountContributed: string;

  @Prop()
  recievePeriod: string;
}

export const GroupMemberSchema = SchemaFactory.createForClass(GroupMember);
