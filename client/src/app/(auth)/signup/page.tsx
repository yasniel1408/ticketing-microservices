"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/useRequest";

const Signup = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    onSuccess: useCallback(
      (data: any) => {
        router.push("/signin");
      },
      [router]
    ),
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await doRequest({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-light card p-5 m-lg-5 m-md-5">
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors && JSON.stringify(errors)}
      <button type="submit" className="btn btn-primary mt-lg-4 mt-md-5 mt-sm-3">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
