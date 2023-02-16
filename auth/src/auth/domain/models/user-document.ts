import mongoose, { Types } from "mongoose";

export interface UserDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  __v?: number;
}
