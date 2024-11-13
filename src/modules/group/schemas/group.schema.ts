import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ContributionType {
  weekly = 'Weekly',
  monthly = 'Monthly',
  yearly = 'Yearly',
}

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  admin: string;

  @Prop({ default: 1 })
  groupCapacity?: number;

  @Prop()
  contribType: ContributionType;
}
export const GroupSchema = SchemaFactory.createForClass(Group);
