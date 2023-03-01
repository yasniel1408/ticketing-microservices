export enum OrderStatus {
  /**
   * Cuando la orden es creada pero el ticket se esta tratando de reservar.
   */
  Created = "created",

  /**
   * Cuando la reserva del ticket ya ha sido reservado
   * o cuando el usuario a cancelado la orden
   * o expiro la reserva antes del pago
   */
  Cancelled = "cancelled",

  /**
   * Cuando la orden se reservo pero aun no se paga
   */
  AwaitingPayment = "awaiting:payment",

  /**
   * Cuando se resevo y se pago el ticket
   */
  Complete = "complete",
}

export default OrderStatus