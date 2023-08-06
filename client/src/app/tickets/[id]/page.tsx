import { headers } from "next/headers";
import { baseURLCluster } from "@/constants";
import PurchaseButton from "./components/PurchaseButton";

const fetchTicket = async ({ id }: { id: number }) => {
  const headersList = headers();

  return fetch(`${baseURLCluster}/api/tickets/${id}`, {
    cache: "no-store",
    headers: headersList,
  }).then((res) => res.json());
};

const Ticket = async ({ params }: { params: any }) => {
  const { id } = params;
  const data = await fetchTicket({ id });
  const { ticket } = data;

  return (
    <div className="m-5">
      <h1>Ticket: {ticket?.title}</h1>
      <h4>Price: {ticket?.price}</h4>
      <PurchaseButton ticketId={id} />
    </div>
  );
};

export default Ticket;
