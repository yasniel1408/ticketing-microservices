import { UserSignupRequestDto } from "../api/models/user-signup-request-dto";
import { UserSignupResponseDto } from "../api/models/user-signup-response-dto";
import UserRepository from "../domain/repository/user-repository";

class SignupService {
  async signup(user: UserSignupRequestDto): Promise<UserSignupResponseDto> {
    const userCreated: UserSignupResponseDto = await UserRepository.create(
      user
    );
    return userCreated;
  }
}

export default new SignupService();
