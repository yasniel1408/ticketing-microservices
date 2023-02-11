import './globals.css';
import { ReactNode } from 'react';
import { AuthenticationProvider } from '@/context/AuthenticationProvider';
import Header from './components/Header/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthenticationProvider>
          <Header />
          {children}
        </AuthenticationProvider>
      </body>
    </html>
  );
}
