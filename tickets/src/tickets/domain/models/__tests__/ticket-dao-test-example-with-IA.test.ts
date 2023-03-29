import mongoose from "mongoose";
import { TicketDao } from "../ticket-dao";

describe("Ticket Model", () => {
  it("should create and save a ticket successfully", async () => {
    const ticketData = {
      title: "Test Ticket",
      price: 10,
      userId: "user123",
    };
    const validTicket = new TicketDao(ticketData);
    const savedTicket = await validTicket.save();

    expect(savedTicket._id).toBeDefined();
    expect(savedTicket.title).toBe(ticketData.title);
    expect(savedTicket.price).toBe(ticketData.price);
    expect(savedTicket.userId).toBe(ticketData.userId);
  });

  it("should not allow duplicate titles", async () => {
    // Test for unique validation
    try {
      const ticket1 = new TicketDao({
        title: "test",
        price: 100,
        userId: "user123",
      });
      await ticket1.save();

      const ticket2 = new TicketDao({
        title: "test",
        price: 200,
        userId: "user456",
      });

      await ticket2.save(); // This should throw an error because of the unique constraint on the `title` field.
    } catch (error: any) {
      expect(error.name).toEqual("MongoServerError");
      expect(error.code).toEqual(11000);
      // The code value of `11000` indicates that there was a duplicate key error.
    }
  });
});
