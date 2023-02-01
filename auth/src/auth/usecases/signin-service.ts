import UserRepository from "@app/auth/domain/user-repository";
import { HashPasswordService } from ".";
import { BadRequestError } from "@app/common/errors";
import { UserAuthenticationRequestDto } from "@app/auth/api/models";

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
