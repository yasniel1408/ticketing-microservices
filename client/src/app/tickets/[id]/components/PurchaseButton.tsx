"use client";

import React, { useCallback } from "react";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";

const PurchaseButton = ({ ticketId }: any) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    onSuccess: useCallback(
      (data: any) => {
        console.log(data);
        router.push(`/payment/${data.order.id}`);
      },
      [router]
    ),
  });

  const onCLick = () => {
    doRequest({
      ticketId,
    });
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onCLick}>
        Purchase
      </button>
      {errors && JSON.stringify(errors)}
    </>
  );
};

export default PurchaseButton;
