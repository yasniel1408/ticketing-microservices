import { HydratedDocument } from "mongoose";
import { CRUDRepository } from "../../../common/interfaces/crud-repository";
import { UserDao } from "../models/user-dao";
import { UserDto } from "../models/user-dto";

class UserRepository implements CRUDRepository<UserDto> {
  async findAll(limit = 10, page = 0): Promise<HydratedDocument<UserDto>[]> {
    return UserDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: UserDto): Promise<HydratedDocument<UserDto>> {
    const user: HydratedDocument<UserDto> = new UserDao(resource);
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

  async getUserByEmail(email: string) {
    return UserDao.findOne({ email: email }).exec();
  }

  async getById(id: string): Promise<any> {
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
