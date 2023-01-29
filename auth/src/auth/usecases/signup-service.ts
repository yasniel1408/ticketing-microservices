import { UserAuthenticationRequestDto } from "../api/models/user-authentication-request-dto";
import UserRepository from "../domain/repository/user-repository";

class SignupService {
  async signup(user: UserAuthenticationRequestDto): Promise<any> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
