"use client";

import Link from "next/link";
import useRequest from "@/hooks/useRequest";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import CreateTicketButton from "./components/CreateTicketButton/CreateTicketButton";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "get",
    onSuccess: useCallback((data: any) => {
      setTickets(data.tickets);
    }, []),
  });

  useEffect(() => {
    doRequest({});
  }, [doRequest]);

  return (
    <main>
      <CreateTicketButton />
      {errors && JSON.stringify(errors)}
      <h1 className={styles.center}>Tickets List:</h1>
      <div className="d-flex w-100 flex-wrap justify-content-center">
        {tickets.map((item: any) => {
          return (
            <div className="card p-5 m-2 col-4" key={item.id}>
              <div className="card-body">
                <h1 className="card-title">Title: {item.title}</h1>
                <h3 className="card-subtitle">Price: {item.price}</h3>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </p>
                <Link href={`/tickets/${item.id}`}>
                  <button type="button" className="btn btn-primary">
                    View
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
