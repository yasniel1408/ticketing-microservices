import './globals.css';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { AuthenticationProvider } from '@/context/AuthenticationProvider';
import Header from './components/Header/Header';

// Esta es la manera de hacer fetching de datos en Next 13
// Y para el caso de los microservicios necesitamos comunicarnos
// en el ingress-nginx para que redireccione desde el servidor al
// namespase de los microservicios (http://<Service>.<namespace>.svc.cluster.local)
const fetchCurrentUser = () => {
  const headersList = headers();

  return fetch(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      cache: 'no-store',
      headers: headersList,
    },
  ).then((res) => res.json());
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const data = await fetchCurrentUser();

  return (
    <html lang="en">
      <head />
      <body>
        <AuthenticationProvider currentUser={data.user}>
          <Header />
          {children}
        </AuthenticationProvider>
      </body>
    </html>
  );
};

export default RootLayout;
