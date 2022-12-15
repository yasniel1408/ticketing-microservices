import mongoose, { Schema } from "mongoose";
import {HashPasswordService} from "../../services/hash-password-service";
import { UserDto } from "./user-dto";

const userSchema = new Schema<UserDto>({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await HashPasswordService.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const UserDao = mongoose.model<UserDto>("User", userSchema);

export { UserDao };
