import { CRUDRepository } from "@common-ticketing-microservices/common";
import { OrderDto } from "./models/order-dto";
import { OrderDao } from "./models/order-dao";
import { OrderDocument } from "./models/order-document";
import mongoose, { Types } from "mongoose";

class OrderCrudRepository implements CRUDRepository<OrderDto> {
  async findAll(limit = 10, page = 0): Promise<OrderDocument[]> {
    return OrderDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: OrderDto): Promise<OrderDocument> {
    const order: OrderDocument = new OrderDao({
      _id: resource.id,
      ...resource,
    });
    await order.save();
    return order;
  }

  async editById(id: string, resource: OrderDto): Promise<string> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const order = await OrderDao.findByIdAndUpdate(
      { _id },
      { $set: resource },
      { new: true }
    ).exec();
    order?.save();
    return id;
  }

  async getById(id: string): Promise<OrderDocument | null> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const order = await OrderDao.findById({
      _id,
    }).exec();
    return order;
  }

  async deleteById(id: string): Promise<string> {
    await OrderDao.deleteOne({ _id: id }).exec();
    return id;
  }
}

export default new OrderCrudRepository();
