'use client';

import { useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { AuthContext } from '@/context/authContext';

const Signout = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: useCallback(
      (data: any) => {
        setUser(null);
        router.push('/signin');
      },
      [router, setUser],
    ),
  });

  useEffect(() => {
    doRequest({});
  }, [doRequest]);

  return <div>Signing you out...</div>;
};

export default Signout;
