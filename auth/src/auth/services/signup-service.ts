import UserRepository from '../domain/repository/user-repository';
import {UserSignupResponseDto} from "../api/models/user-signup-response-dto";

class SignupService {
  async signup(user: any): Promise<UserSignupResponseDto> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
