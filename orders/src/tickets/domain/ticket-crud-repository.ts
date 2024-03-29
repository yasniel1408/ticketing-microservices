import { CRUDRepository } from "@common-ticketing-microservices/common";
import { TicketDto } from "./models/ticket-dto";
import { TicketDao } from "./models/ticket-dao";
import { TicketDocument } from "./models/ticket-document";
import mongoose, { Types } from "mongoose";

class TicketCrudRepository implements CRUDRepository<TicketDto> {
  async findAll(limit = 10, page = 0): Promise<TicketDocument[]> {
    return TicketDao.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async create(resource: TicketDto): Promise<TicketDocument> {
    const user: TicketDocument = new TicketDao({
      _id: resource.id,
      title: resource.title,
      price: resource.price,
      version: resource.version, // esto es porque este servicio no es el que debe incrementar la version sino que deberia tomar la version que viene
    });
    await user.save();
    return user;
  }

  async editById(id: string, resource: TicketDto): Promise<string> {
    const _id: Types.ObjectId = new mongoose.Types.ObjectId(id);
    const ticket = await TicketDao.findByIdAndUpdate(
      // no ejecutamos el save aqui porque el save genera una version nueva y no queremos eso aca
      { _id },
      {
        $set: {
          _id: resource.id,
          title: resource.title,
          price: resource.price,
          version: resource.version, // esto es porque este servicio no es el que debe incrementar la version sino que deberia tomar la version que viene
        },
      },
      { new: true }
    ).exec();
    return ticket?.id;
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

export default new TicketCrudRepository();
