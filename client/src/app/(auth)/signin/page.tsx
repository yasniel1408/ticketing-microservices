'use client';

import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { AuthContext } from '@/context/authContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    onSuccess: useCallback(
      (data: any) => {
        console.log('USERSSSSS:', data.user);
        setUser(data.user);
        router.push('/');
      },
      [router, setUser],
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
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
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
        Sign In
      </button>
    </form>
  );
};

export default Signin;
