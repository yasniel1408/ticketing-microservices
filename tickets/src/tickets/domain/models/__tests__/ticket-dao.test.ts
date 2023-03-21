import { TicketDao } from "@app/tickets/domain/models/ticket-dao";

it("should up the version", async () => {
  const ticket = new TicketDao({
    title: "ExampleAatrtasrt",
    price: 200,
    userId: "qwerreq",
  });
  await ticket.save(); // aqui la version deberia ser 0

  const firstInstance = await TicketDao.findByIdAndUpdate(
    { _id: ticket.id },
    { $set: { price: 90 } },
    { new: true }
  ).exec();
  await firstInstance?.save();

  expect(firstInstance!.version).toEqual(1);
  await firstInstance?.save();
  expect(firstInstance!.version).toEqual(2);
});

it("should not throw error if version is not consecutive", async () => {
  const ticket = new TicketDao({
    title: "ExampleAAArtsrtsrtr",
    price: 200,
    userId: "qwerreq",
  });
  await ticket.save(); // aqui la version deberia ser 0

  const firstInstance = await TicketDao.findByIdAndUpdate(
    { _id: ticket.id },
    { $set: { price: 90, version: 3 } },
    { new: true }
  ).exec();

  try {
    await firstInstance?.save();
  } catch (error) {
    expect(`${error}`).toContain(ticket.id);
  }
});

// it("implements optimistic concurrency control", async () => {
//   const ticket = new TicketDao({
//     title: "ExampleAAA",
//     price: 200,
//     userId: "qwerreq",
//   });
//   await ticket.save(); // aqui la version deberia ser 0

//   // create 2 instances and then compare
//   const firstInstance = await TicketDao.findById(ticket.id);
//   const secondInstance = await TicketDao.findById(ticket.id);

//   firstInstance!.set({ price: 300 }); // aqui la version deberia ser 1
//   secondInstance!.set({ price: 400 }); // aqui la version deberia ser 2

//   await firstInstance!.save(); // intentaremos guardar con la version equivocada y deberia dar un error

//   try {
//     await secondInstance!.save();
//   } catch (error) {
//     return done();
//   }
// });
