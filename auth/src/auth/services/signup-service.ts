import { UserDto } from "../../users/models/user-dto";
import UserRepository from '../../users/repository/user-repository';

class SignupService {
  async signup(user: UserDto) {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
