import { UserAuthenticationRequestDto } from "@app/auth/api/models";
import { UserRepository } from "@app/auth/domain";
import { UserDocument } from "@app/auth/domain/models/user-document";

class SignupService {
  async signup(user: UserAuthenticationRequestDto): Promise<UserDocument> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
