import { UserRepository } from "@app/tickets/domain";

class SignupService {
  async signup(user: any): Promise<any> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
