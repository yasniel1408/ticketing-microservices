import { BadRequestError } from "../../common/errors/bad-request-error";
import UserRepository from "../domain/repository/user-repository";
import { HashPasswordService } from "./hash-password-service";
import { UserAuthenticationRequestDto } from '../api/models/user-authentication-request-dto';

class SigninService {
  async signin(user: UserAuthenticationRequestDto): Promise<any> {
    const { email, password }: UserAuthenticationRequestDto = user;

    const existingUser = await UserRepository.getUserByEmail(email);

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }

    const isPasswordMatch = await HashPasswordService.compare(
      existingUser.password,
      password
    );

    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    return existingUser;
  }
}

export default new SigninService();
