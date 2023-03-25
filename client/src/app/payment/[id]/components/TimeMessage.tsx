"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TimeMessage = ({ expiresAt }: any) => {
  const [time, setTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const msLeft: number = (new Date(expiresAt) as any) - (new Date() as any);

      setTime(Math.round(msLeft / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt]);

  useEffect(() => {
    if (time < 0) {
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  }, [router, time]);

  return (
    <div>
      {time > 0 ? <h1>You have ${time} seconds </h1> : <h3>Order Expired!!</h3>}
    </div>
  );
};

export default TimeMessage;
