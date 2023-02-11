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
import LoadingSpinner from '@/app/components/LoadingSpinner/LoadingSpinner';

export const AuthContext: Context<IUserAuthenticationProvider> =
  createContext<IUserAuthenticationProvider>({
    user: null,
    setUser: () => {},
    logout: () => {},
    login: () => {},
    isLogged: false,
  });

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [userCookie, setUserCookie] = reactUseCookie('user', '');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    !user && userCookie && setUser(JSON.parse(userCookie));
    setLoading(false);
  }, [user, userCookie]);

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
    setLoading(false);
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

  if (loading) return <LoadingSpinner />;

  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
}
