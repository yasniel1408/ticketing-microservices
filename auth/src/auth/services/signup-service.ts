import UserRepository from "../domain/repository/user-repository";

class SignupService {
  async signup(user: any): Promise<any> {
    const userCreated = await UserRepository.create(user);
    return userCreated;
  }
}

export default new SignupService();
