import { Message, Stan } from 'node-nats-streaming';
import { BaseEvent } from "../index";

export default abstract class BaseListener<T extends BaseEvent> {
  abstract subject: T["subject"];
  abstract durableName: string;
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000; // 5 segundos

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // esta opcion es para decirle que recupere la primera vez todos los eventos
      .setManualAckMode(true) // esta opcion es para decirle que el tiempo de espera para saber si un servicio murio lo vamos a establecer manuamlente, luego de ese tiempo NATS reenvia el evento a los servicios
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName) // con esta opcion tenemos los eventos separados por grupos
      .setDurableName(this.durableName); // Esta opcion es para evitar que si el servicio se cae solo se recuperaran los eventos que no estan marcados como procesados para evitar sobrecargar
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
