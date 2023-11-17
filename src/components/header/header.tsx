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
            <a href="#">Как начать игру?</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Правила</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Описания серверов</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Донат</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Личный кабинет</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Магазин блоков</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
