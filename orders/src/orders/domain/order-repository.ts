import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDao } from "./models/order-dao";
import { OrderDocument } from "./models/order-document";
import { ObjectId } from "mongoose";
import { OrderCrudRepository } from ".";

class OrderRepository {
  async getByTicketWithSomeStatus(
    ticketId: ObjectId,
    status: OrderStatus[]
  ): Promise<OrderDocument | null> {
    const order = await OrderDao.findOne({
      ticket: ticketId, // es es cualquiera
      status: {
        $in: [...status], // de esta manera le decimos que queremos alguno que tenga dado los status que le mandemos por parametros
      },
    }).exec();
    return order;
  }

  async findAllByUserId(userId: string): Promise<OrderDocument[]> {
    return OrderDao.find({
      userId,
    })
      .populate("ticket")
      .exec();
  }

  async ifExistOrderById(id: string): Promise<boolean> {
    const order = await OrderCrudRepository.getById(id);
    return !!order;
  }
}

export default new OrderRepository();
