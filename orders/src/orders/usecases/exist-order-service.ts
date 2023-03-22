import { OrderRepository } from "@app/orders/domain";

class ExistOrderService {
  async exist(id: string): Promise<boolean> {
    return !!(await OrderRepository.ifExistOrderById(id));
  }
}

export default new ExistOrderService();
