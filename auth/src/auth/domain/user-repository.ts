import { UserDao } from "./models/user-dao";
import { UserDocument } from "./models/user-document";

class UserCrudRepository {
  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return UserDao.findOne({ email: email }).exec();
  }
}

export default new UserCrudRepository();
