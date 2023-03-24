import { OrderDao } from "./models/order-dao";
import { OrderDocument } from "@app/orders/domain/models/order-document";

class OrderRepository {
  async getByIdAndPreviousVersion(
    id: string,
    version: number
  ): Promise<OrderDocument | null> {
    const order = await OrderDao.findOne({
      _id: id,
      version: version - 1, // esto es para buscar por el id y la version anterior
    }).exec();
    return order;
  }
}

export default new OrderRepository();
