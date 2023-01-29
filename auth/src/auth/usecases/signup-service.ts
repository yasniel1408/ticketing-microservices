import { UserAuthenticationRequestDto } from "auth/api/models";
import { UserRepository } from "auth/domain";

class SignupService {
  async signup(user: UserAuthenticationRequestDto): Promise<any> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
