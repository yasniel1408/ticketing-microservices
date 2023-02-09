import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const links = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Posts", link: "/posts" },
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
        </ul>
      </nav>
  );
}
