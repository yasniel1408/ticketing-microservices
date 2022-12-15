import mongoose from "mongoose";
import {HashPasswordService} from "../../services/hash-password-service";

const userSchema = new mongoose.Schema({
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

const UserDao = mongoose.model("User", userSchema);

export { UserDao };
