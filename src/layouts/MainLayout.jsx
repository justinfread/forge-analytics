// src/layouts/MainLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1>Forge Analytics</h1>
          <p>Web3 Intelligence Dashboard</p>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/stablecoins">Stablecoins</NavLink>
          <NavLink to="/whale-watch">Whale Watch</NavLink>
          <NavLink to="/socialpay">SocialPay Explorer</NavLink>
          <NavLink to="/partnerships">Partnerships</NavLink>
          <NavLink to="/news">News</NavLink>
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;