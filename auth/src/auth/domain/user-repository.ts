import { CRUDRepository } from "@common-ticketing-microservices/common";
import { UserDao } from "./models/user-dao";
import { UserDto } from "./models/user-dto";
import { UserDocument } from "./models/user-document";

class UserRepository implements CRUDRepository<UserDto> {
  async findAll(limit = 10, page = 0): Promise<UserDocument[]> {
    return UserDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: UserDto): Promise<UserDocument> {
    const user: UserDocument = new UserDao(resource);
    await user.save();
    return user;
  }

  async editById(id: string, resource: UserDto): Promise<string> {
    await UserDao.updateOne(
      { _id: id },
      { $set: resource },
      { new: true }
    ).exec();
    return id;
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return UserDao.findOne({ email: email }).exec();
  }

  async getById(id: string): Promise<UserDocument | null> {
    const user = await UserDao.findById({
      _id: id,
    }).exec();
    return user;
  }

  async deleteById(id: string): Promise<string> {
    await UserDao.deleteOne({ _id: id }).exec();
    return id;
  }
}

export default new UserRepository();
