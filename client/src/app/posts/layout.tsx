import { ReactNode } from "react";
import styles from "./page.module.css";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <small>Home / Posts</small>
      {children}
    </div>
  );
};

export default Layout;
