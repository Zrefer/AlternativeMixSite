import { FC } from "react";
import styles from "./header.module.css";
import UserMenu from "../user-menu/user-menu";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <a href="/">Главная</a>
            </li>
            <li className={styles.navItem}>
              <a href="http://f.mix-servers.com/">Форум</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Правила</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Начать играть</a>
            </li>
          </ul>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
};
export default Header;
