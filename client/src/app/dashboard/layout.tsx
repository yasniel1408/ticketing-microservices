import Link from 'next/link';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="container 
      pe-lg-5 ps-lg-5 pe-md-5 ps-md-5 me-lg-5 ms-lg-5 mt-3"
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
