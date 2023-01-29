import jwt from "jsonwebtoken";

class VerifyJwt {
  verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    return payload;
  }
}

export default new VerifyJwt();
