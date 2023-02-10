'use client';

import { useCallback, useState } from 'react';
import { redirect } from 'next/navigation';
import useRequest from '@/hooks/useRequest';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: useCallback((data: any) => {
      console.log(data);
      redirect('/');
    }, []),
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await doRequest({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
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
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
