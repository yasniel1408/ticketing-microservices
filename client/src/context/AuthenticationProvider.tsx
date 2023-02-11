'use client';

import {
  Context,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import reactUseCookie from 'react-use-cookie';
import { IUserAuthentication } from '@/models/UserAuthentication';
import { IUserAuthenticationProvider } from '@/app/interfaces/UserAuthenticationProvider';

export const AuthContext: Context<IUserAuthenticationProvider> =
  createContext<IUserAuthenticationProvider>({
    user: null,
    setUser: () => {},
    logout: () => {},
    login: () => {},
    isLogged: false,
  });

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [userCookie, setUserCookie] = reactUseCookie('user', '');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    !user && userCookie && setUser(JSON.parse(userCookie));
  }, [user, userCookie]);

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
  }, [user]);

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

  const value = useMemo(
    () => ({ user, setUser, logout, login, isLogged }),
    [isLogged, login, logout, user],
  );

  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
}
