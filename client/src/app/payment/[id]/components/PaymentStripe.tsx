"use client";

import React, { useCallback } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/useRequest";

const PaymentStripe = ({ amount, orderId }: any) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    onSuccess: useCallback(
      (data: any) => {
        console.log(data);
        router.push("/dashboard");
      },
      [router]
    ),
  });

  return (
    <StripeCheckout
      token={(token) =>
        doRequest({
          paymentToken: token.id,
          orderId,
        })
      }
      // eslint-disable-next-line max-len
      stripeKey="pk_test_51MpH60GzNnS2myySfthwoc4KoAFE3y7oJP8XElf4hunbEuJ4UDdxbhIsdA4IpYvY3kCXUEKCo0HfeRaGQeKbZmO100MWZSRjBe"
      amount={amount * 100}
      email="yasnielfajardoegues1408@gmail.com" // aqui lo ideal es poner el email de user
    />
  );
};

export default PaymentStripe;
