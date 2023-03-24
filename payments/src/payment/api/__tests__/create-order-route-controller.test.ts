import { app } from "@app/app";
import request from "supertest";
import mongoose from "mongoose";
import { CreateOrderService } from "@app/orders/usecases";
import { OrderStatus } from "@common-ticketing-microservices/common";
import { stripe } from "@app/stripe";
import { GetPaymentByOrderidAndStripeidService } from "@app/payment/usecases";

jest.mock("@app/stripe");

it("return a 404  when purchasing an order that dose not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      paymentToken: "sdfsadfas",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("return a 401  when purchasing an order that dosent belong  to the user", async () => {
  const order = await CreateOrderService.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 90,
    version: 0,
  });
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      paymentToken: "sdfsadfas",
      orderId: order.id,
    })
    .expect(401);
});

it("return a 400  when purchasing an cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = await CreateOrderService.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    status: OrderStatus.Cancelled,
    price: 90,
    version: 0,
  });
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signupAndGetCookie(userId))
    .send({
      paymentToken: "sdfsadfas",
      orderId: order.id,
    })
    .expect(400);
});

it("should return 201", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = await CreateOrderService.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    status: OrderStatus.Created,
    price: 90,
    version: 0,
  });

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signupAndGetCookie(userId))
    .send({
      paymentToken: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const chargeOption = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  expect(chargeOption.source).toEqual("tok_visa");
  expect(chargeOption.amount).toEqual(90 * 100);
  expect(chargeOption.currency).toEqual("usd");

  const payment = await GetPaymentByOrderidAndStripeidService.get({
    orderId: order.id,
    stripeId: chargeOption.id,
  });

  expect(payment).toBeDefined();
});
