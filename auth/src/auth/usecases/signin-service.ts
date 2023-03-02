import { UserRepository } from "@app/auth/domain";
import { HashPasswordService } from ".";
import { UserAuthenticationRequestDto } from "@app/auth/api/models";
import { BadRequestError } from "@common-ticketing-microservices/common";
import { UserDocument } from "@app/auth/domain/models/user-document";

class SignInService {
  async signin(user: UserAuthenticationRequestDto): Promise<UserDocument> {
    const { email, password }: UserAuthenticationRequestDto = user;

    const existingUser: UserDocument | null =
      await UserRepository.getUserByEmail(email);

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
