import { FC } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../user-menu/user-menu";
import styles from "./header.module.css";

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
              <Link to="https://minecraft.mix-servers.com/page/rules">
                Правила
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="https://minecraft.mix-servers.com/page/start">
                Начать играть
              </Link>
            </li>
          </ul>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
};
export default Header;
