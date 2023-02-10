import { getCookie } from 'react-use-cookie';
import jwt from 'jsonwebtoken';

export const getUser = () => {
  const token: any = getCookie('session');
  const user = token && jwt.decode(token);

  return user;
};
