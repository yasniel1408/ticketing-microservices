import jwt from "jsonwebtoken";
import { UserAuthenticationRequestDto } from "auth/api/models/user-authentication-request-dto";

class CreateJwt {
  create(user: UserAuthenticationRequestDto & { id: string }) {
    const userJwt = jwt.sign(
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
