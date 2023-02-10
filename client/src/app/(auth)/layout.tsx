import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <small>Home / User</small>
      {children}
    </div>
  );
};

export default Layout;
