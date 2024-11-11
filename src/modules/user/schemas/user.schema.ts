import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop({ set: (value: string) => hashSync(value, 10) })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
