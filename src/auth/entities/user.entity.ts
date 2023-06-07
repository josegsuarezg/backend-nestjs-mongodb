import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
  
  @Prop({required: true, unique: true, lowercase: true})
  email: string;
  
  @Prop({required: true, select: false})
  password: string;
  
  @Prop()
  fullName: string;
  
  @Prop({default: true})
  isActive: boolean;
  
  @Prop({array: true, default: ['user']})
  roles: string[];
  
  @Prop()
  token?: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
