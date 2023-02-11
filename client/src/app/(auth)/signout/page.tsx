'use client';

import { useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { AuthContext } from '@/context/AuthenticationProvider';

const Signout = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: useCallback(
      (data: any) => {
        logout(null);
        router.push('/signin');
      },
      [router, logout],
    ),
  });

  useEffect(() => {
    doRequest({});
  }, [doRequest]);

  return <div>Signing you out...</div>;
};

export default Signout;
