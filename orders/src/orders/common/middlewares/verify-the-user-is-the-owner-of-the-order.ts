import { GetOrderService } from "@app/orders/usecases";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import {
  NotFoundError,
  NotAuthorizedError,
} from "@common-ticketing-microservices/common";
import { NextFunction, Request, Response } from "express";

class VerifyTheUserIsTheOwnerOfTheOrder {
  async verify(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const order: OrderDocument | null = await GetOrderService.get(id);

    // esto es para verificar que el order sea del user
    if (order?.userId !== req.currentUser?.id) throw new NotAuthorizedError();

    next();
  }
}

export default new VerifyTheUserIsTheOwnerOfTheOrder();
