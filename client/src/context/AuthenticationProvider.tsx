'use client';

import {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import reactUseCookie from 'react-use-cookie';
import { IUserAuthentication } from '@/models/UserAuthentication';

export const AuthContext: Context<{
  user: IUserAuthentication | null;
  setUser: Dispatch<SetStateAction<IUserAuthentication | null>>;
  logout: Dispatch<SetStateAction<IUserAuthentication | null>>;
  login: any;
}> = createContext<{
  user: IUserAuthentication | null;
  setUser: Dispatch<SetStateAction<IUserAuthentication | null>>;
  logout: Dispatch<SetStateAction<IUserAuthentication | null>>;
  login: any;
}>({ user: null, setUser: () => {}, logout: () => {}, login: () => {} });

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [userCookie, setUserCookie] = reactUseCookie('user', '');

  useEffect(() => {
    !user && userCookie && setUser(JSON.parse(userCookie));
  }, [user, userCookie]);

  const logout = useCallback(() => {
    setUser(null);
    setUserCookie('');
  }, [setUserCookie]);

  const login = useCallback(
    (data: IUserAuthentication) => {
      setUser(data);
      setUserCookie(JSON.stringify(data));
    },
    [setUserCookie],
  );

  const value = useMemo(() => ({ user, setUser, logout, login }), [login, logout, user]);

  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
}
