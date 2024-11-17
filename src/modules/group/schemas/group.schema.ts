import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

export enum ContributionType {
  weekly = 'Weekly',
  monthly = 'Monthly',
  yearly = 'Yearly',
}

export enum PositionType {
  admin = 'Admin',
  member = 'Member',
}

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop()
  description: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Prop()
  admin: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  members: User[];

  @Prop({ default: 1 })
  no_of_members: number;

  @Prop()
  contribType: ContributionType;
}
export const GroupSchema = SchemaFactory.createForClass(Group);
