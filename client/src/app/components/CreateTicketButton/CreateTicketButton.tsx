"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthenticationProvider";

const CreateTicketButton = () => {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) return null;

  return (
    <Link href="/tickets/create">
      <button type="button" className="btn btn-success m-3">
        + Create Ticket
      </button>
    </Link>
  );
};

export default CreateTicketButton;
