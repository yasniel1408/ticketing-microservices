import { UserResponseDto } from "auth/api/models";
import jwt from "jsonwebtoken";

class VerifyJwt {
  verify(token: string): UserResponseDto {
    const payload: UserResponseDto = jwt.verify(
      token,
      process.env.JWT_KEY!
    ) as UserResponseDto;

    return payload;
  }
}

export default new VerifyJwt();
