import { UserRepository } from "@app/auth/domain";
import { UserDocument } from "@app/auth/domain/models/user-document";

class GetUserByEmail {
  async getByEmail(email: string): Promise<UserDocument | null> {
    return await UserRepository.getUserByEmail(email);
  }
}

export default new GetUserByEmail();
