import { FC } from "react";
import styles from "./header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
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
    </header>
  );
};
export default Header;
