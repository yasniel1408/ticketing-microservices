'use client';

import Link from 'next/link';
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthenticationProvider';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useContext<any>(AuthContext);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Posts', link: '/posts' },
    { name: 'Sign Up', link: '/signup' },
    { name: 'Sign In', link: '/signin' },
    { name: 'Sign Out', link: '/signout' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          TIKETING
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map(({ name, link }: { name: string; link: string }) => {
              return (
                <li key={name} className="nav-item">
                  <Link href={link} className="nav-link active" aria-current="page">
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="d-flex">
            {user && (
              <div key="user.email">
                <p className="text-white">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
