import './globals.css';
import { ReactNode } from 'react';
import Header from './components/Header';
import { AuthenticationProvider } from '@/context/authContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <AuthenticationProvider>
        <body>
          <Header />
          {children}
        </body>
      </AuthenticationProvider>
    </html>
  );
}
