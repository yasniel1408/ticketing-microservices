"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/useRequest";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    onSuccess: useCallback(
      (data: any) => {
        router.push("/");
      },
      [router]
    ),
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await doRequest({
      title,
      price,
    });
  };

  const onBlur = async () => {
    const value = parseFloat(price);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <form onSubmit={onSubmit} className="bg-light card p-5 m-lg-5 m-md-5">
      <h1>Create Ticket</h1>
      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          onBlur={onBlur}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        />
      </div>
      {errors && JSON.stringify(errors)}
      <button type="submit" className="btn btn-primary mt-lg-4 mt-md-5 mt-sm-3">
        Create
      </button>
    </form>
  );
};

export default CreateTicket;
