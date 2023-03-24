import { CRUDRepository } from "@common-ticketing-microservices/common";
import mongoose, { Types } from "mongoose";
import { PaymentDto } from "./models/payment-dto";
import { PaymentDocument } from "./models/payment-document";
import { PaymentDao } from "./models/payment-dao";

class PaymentCrudRepository implements CRUDRepository<PaymentDto> {
  async findAll(limit = 10, page = 0): Promise<PaymentDocument[]> {
    return PaymentDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: PaymentDto): Promise<PaymentDocument> {
    const user: PaymentDocument = new PaymentDao(resource);
    await user.save();
    return user;
  }

  async editById(id: string, resource: any): Promise<string> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const payment = await PaymentDao.findByIdAndUpdate(
      { _id },
      { $set: resource },
      { new: true }
    ).exec();
    await payment?.save();
    return id;
  }

  async getById(id: string): Promise<PaymentDocument | null> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const user = await PaymentDao.findById({
      _id,
    }).exec();
    return user;
  }

  async deleteById(id: string): Promise<string> {
    await PaymentDao.deleteOne({ _id: id }).exec();
    return id;
  }
}

export default new PaymentCrudRepository();
