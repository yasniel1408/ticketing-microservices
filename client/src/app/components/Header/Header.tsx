'use client';

import Link from 'next/link';
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import { useContext, useLayoutEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthenticationProvider';

export default function Header() {
  const { user, isLogged } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { name: 'Home', link: '/', isProtected: false },
      { name: 'Dashboard', link: '/dashboard', isProtected: true },
      { name: 'Posts', link: '/posts', isProtected: false },
      { name: 'Sign Up', link: '/signup', isProtected: false },
      { name: 'Sign In', link: '/signin', isProtected: false },
      { name: 'Sign Out', link: '/signout', isProtected: true },
    ],
    [],
  );

  console.log(pathname);

  useLayoutEffect(() => {
    links.forEach(({ link, isProtected }) => {
      if (!user && !isLogged && pathname === link && isProtected) {
        router.push('/');
      }
    });
  }, [isLogged, links, pathname, router, user]);

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
            {links.map(
              ({
                name,
                link,
                isProtected,
              }: {
                name: string;
                link: string;
                isProtected: boolean;
              }) => {
                if (isProtected && !isLogged) return null;
                if (isLogged && (link === '/signup' || link === '/signin')) return null;
                return (
                  <li key={name} className="nav-item">
                    <Link
                      href={link}
                      className={`nav-link ${pathname === link && 'active'}`}
                      aria-current="page"
                    >
                      {name}
                    </Link>
                  </li>
                );
              },
            )}
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
