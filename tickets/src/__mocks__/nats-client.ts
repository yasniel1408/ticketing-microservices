class NatsClientWrapper {
  client = {
    publish: jest
      .fn()
      .mockImplementation((subject: string, data: string, callback) => {
        callback();
      }),
  };
}

export default new NatsClientWrapper();
