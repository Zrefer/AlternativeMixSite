import { FC } from "react";
import styles from "./header.module.css";
import UserMenu from "../user-menu/user-menu";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link to="/">Главная</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="http://f.mix-servers.com/">Форум</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="#">Правила</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="#">Начать играть</Link>
            </li>
          </ul>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
};
export default Header;
