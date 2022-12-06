import mongoose from "mongoose";

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

const UserDao = mongoose.model("User", userSchema);

export { UserDao };
