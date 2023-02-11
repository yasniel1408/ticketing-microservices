import { Dispatch, SetStateAction } from 'react';
import { IUserAuthentication } from '@/models/UserAuthentication';

export interface IUserAuthenticationProvider {
  user: IUserAuthentication | null;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<IUserAuthentication | null>>;
  logout: Dispatch<SetStateAction<IUserAuthentication | null>>;
  login: any;
}
