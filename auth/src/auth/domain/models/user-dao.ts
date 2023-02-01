import mongoose, { Schema } from "mongoose";
import { HashPasswordService } from "@app/auth/usecases";
import { UserDto } from "./user-dto";

const userSchema = new Schema<UserDto>(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await HashPasswordService.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const UserDao = mongoose.model<UserDto>("User", userSchema);

export { UserDao };
