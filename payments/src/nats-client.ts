import nats, {Stan} from "node-nats-streaming";

class NatsClientWrapper {
  public _client?: Stan;

  async connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS!!!!");
        resolve();
      });
      this.client.on("error", (err) => {
        console.log(`ERROR => ${err}`);
        reject(err);
      });
    });
  }

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting!!!");
    }
    return this._client;
  }
}

export default new NatsClientWrapper();
