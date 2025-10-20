import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRole = 'client' | 'transporter' | 'admin';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: true, enum: ['client', 'transporter', 'admin'], default: 'client' })
  role!: UserRole;

  @Prop({ type: String })
  firstName?: string;

  @Prop({ type: String })
  lastName?: string;

  @Prop({ type: String })
  phone?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);


