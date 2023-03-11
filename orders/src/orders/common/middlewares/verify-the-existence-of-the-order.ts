import { GetOrderService } from "@app/orders/usecases";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { NotFoundError } from "@common-ticketing-microservices/common";
import { NextFunction, Request, Response } from "express";

// Esto lo usamos para decirle que busque esta interfaz y le agrege la propiedad de order
declare global {
  namespace Express {
    export interface Request {
      order?: OrderDocument;
    }
  }
}

class VerifyTheExistenceOfTheOrder {
  async verify(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const order: OrderDocument | null = await GetOrderService.get(id);

    // si no encontramos la orden retornamos un error 404
    if (!order) throw new NotFoundError();

    req.order = order;

    next();
  }
}

export default new VerifyTheExistenceOfTheOrder();
