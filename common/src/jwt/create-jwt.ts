import UserAuthenticationRequestDto from "../models/user-authentication-request-dto";
import jwt from "jsonwebtoken";

class CreateJwt<T> {
  create(user: UserAuthenticationRequestDto & { id: string }): string {
    const userJwt: string = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    return userJwt;
  }
}

export default new CreateJwt();
