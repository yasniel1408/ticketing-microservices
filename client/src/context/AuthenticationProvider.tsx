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

export function AuthenticationProvider({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser?: IUserAuthentication;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const login = useCallback((data: IUserAuthentication) => {
    setUser(data);
  }, []);

  useEffect(() => {
    currentUser && setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
    setLoading(false);
  }, [user]);

  const value = useMemo(
    () => ({ user, setUser, logout, login, isLogged }),
    [isLogged, login, logout, user],
  );

  if (loading) return <LoadingSpinner />;

  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
}
