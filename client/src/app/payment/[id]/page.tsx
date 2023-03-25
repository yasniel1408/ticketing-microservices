import { baseURLCluster } from "@/constants";
import { headers } from "next/headers";
import TimeMessage from "./components/TimeMessage";
import PaymentStripe from "./components/PaymentStripe";

const fetchOrder = async ({ id }: { id: number }) => {
  const headersList = headers();

  return fetch(`${baseURLCluster}/api/orders/${id}`, {
    cache: "no-store",
    headers: headersList,
  }).then((res) => res.json());
};

const PaymentOrder = async ({ params }: any) => {
  const { id } = params;

  const data = await fetchOrder({ id });

  console.log(data.order);

  return (
    <div className="m-5">
      <TimeMessage expiresAt={data.order.expiresAt} />
      <h4>Order Pay / {id}</h4>
      <PaymentStripe amount={data.order.ticket.price} orderId={data.order.id} />
    </div>
  );
};

export default PaymentOrder;
