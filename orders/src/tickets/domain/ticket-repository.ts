import { CRUDRepository } from "@common-ticketing-microservices/common";
import { TicketDto } from "./models/ticket-dto";
import { TicketDao } from "./models/ticket-dao";
import { TicketDocument } from "./models/ticket-document";
import mongoose, { Types } from "mongoose";

class TicketRepository implements CRUDRepository<TicketDto> {
  async findAll(limit = 10, page = 0): Promise<TicketDocument[]> {
    return TicketDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: TicketDto): Promise<TicketDocument> {
    const user: TicketDocument = new TicketDao(resource);
    await user.save();
    return user;
  }

  async editById(id: string, resource: TicketDto): Promise<string> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    await TicketDao.findByIdAndUpdate(
      { _id },
      { $set: resource },
      { new: true }
    ).exec();
    return id;
  }

  async getById(id: string): Promise<TicketDocument | null> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const user = await TicketDao.findById({
      _id,
    }).exec();
    return user;
  }

  async deleteById(id: string): Promise<string> {
    await TicketDao.deleteOne({ _id: id }).exec();
    return id;
  }
}

export default new TicketRepository();
