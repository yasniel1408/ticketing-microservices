import './globals.css';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import Header from './components/Header/Header';
import { AuthenticationProvider } from '@/context/AuthenticationProvider';

// Esta es la manera de hacer fetching de datos en Next 13
// Y para el caso de los microservicios necesitamos comunicarnos
// en el ingress-nginx para que redireccione desde el servidor al
// namespase de los microservicios (http://<Service>.<namespace>.svc.cluster.local)
const fetchCurrentUser = async () => {
  const headersList = headers();

  const res = await fetch(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      cache: 'no-store',
      headers: headersList,
    },
  );
  return res.json();
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const getData = fetchCurrentUser();
  const data = await getData;

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
