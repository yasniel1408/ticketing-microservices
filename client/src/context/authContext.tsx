'use client';

import {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import reactUseCookie from 'react-use-cookie';

export const AuthContext: Context<{
  user: {
    email: string;
    name: string;
  } | null;
  setUser: Dispatch<
    SetStateAction<{
      email: string;
      name: string;
    } | null>
  >;
}> = createContext<{
  user: {
    email: string;
    name: string;
  } | null;
  setUser: Dispatch<
    SetStateAction<{
      email: string;
      name: string;
    } | null>
  >;
}>({ user: null, setUser: () => {} });

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [userToken, setUserToken] = reactUseCookie('user', '{}');

  useEffect(() => {
    user ? setUserToken(JSON.stringify(user)) : setUserToken('null');
  }, [user, setUserToken]);

  useEffect(() => {
    userToken && setUser(JSON.parse(userToken));
  }, [userToken]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
