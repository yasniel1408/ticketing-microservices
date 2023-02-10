'use client';

import Link from 'next/link';
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className={styles.ul}>
        {links.map(({ name, link }: { name: string; link: string }) => {
          return (
            <li key={name} className={styles.li}>
              <Link href={link}>{name}</Link>
            </li>
          );
        })}
        {user && (
          <li key="user.email">
            <p>{user?.email}</p>
          </li>
        )}
      </ul>
    </nav>
  );
}
