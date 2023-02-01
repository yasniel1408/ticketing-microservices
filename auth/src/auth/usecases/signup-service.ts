import { UserAuthenticationRequestDto } from "@app/auth/api/models";
import { UserRepository } from "@app/auth/domain";

class SignupService {
  async signup(user: UserAuthenticationRequestDto): Promise<any> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
