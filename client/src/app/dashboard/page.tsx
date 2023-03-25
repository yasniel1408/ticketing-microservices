import { headers } from "next/headers";
import { baseURLCluster } from "@/constants";
import styles from "./page.module.css";

const fetchMyOrders = async () => {
  const headersList = headers();

  return fetch(`${baseURLCluster}/api/orders/`, {
    cache: "no-store",
    headers: headersList,
  }).then((res) => res.json());
};

const Dashboard = async () => {
  const data = await fetchMyOrders();

  return (
    <main>
      <div className={styles.center}> ORDENES</div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Expira</th>
            <th scope="col">Ticket</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.tickets.map((item: any, index: number) => {
            return (
              <tr
                key={item.id}
                className={
                  item.status === "cancelled" ? "bg-danger" : "bg-success"
                }
              >
                <th scope="row">{index + 1}</th>
                <td>{item.status}</td>
                <td>{item.expiresAt}</td>
                <td className="">{item.ticket.title}</td>
                <td>{item.ticket.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
