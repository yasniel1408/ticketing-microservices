import jwt from "jsonwebtoken";

class VerifyJwt<T> {
  verify(token: string): T {
    const payload: T = jwt.verify(token, process.env.JWT_KEY!) as T;

    return payload;
  }
}

export default new VerifyJwt();
