import UserRepository from "auth/domain/repository/user-repository";
import { HashPasswordService } from ".";
import { UserAuthenticationRequestDto } from "auth/api/models/user-authentication-request-dto";
import { BadRequestError } from "common/errors";

class SignInService {
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

export default new SignInService();
