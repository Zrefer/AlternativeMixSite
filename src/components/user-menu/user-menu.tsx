import { FC, useEffect, useState } from "react";
import UserIcon from "../user-icon/user-icon";
import { user } from "../../data";
import styles from "./user-menu.module.css";
import genStyles from "../../styles/generalStyles.module.css";

import ProfileIcon from "../../../public/images/profile-icon.svg";
import AccountIcon from "../../../public/images/account-icon.svg";
import ShoppingIcon from "../../../public/images/shopping-icon.svg";
import SavingsIcon from "../../../public/images/savings-icon.svg";

const UserMenu: FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!isActive || !target) return;
      if (target.closest(`.${styles.userContainer}`)) return;
      if (target.closest(`.${styles.dropDown}`)) return;

      setIsActive(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive]);

  if (user.data) {
    return (
      <div className={styles.container}>
        <div className={styles.userContainer} onClick={() => setIsActive(true)}>
          <UserIcon playerName={user.data.nick} />
          <span className={`${genStyles.midText} ${styles.userName}`}>
            {user.data.nick}
          </span>
        </div>
        <div
          className={`${styles.dropDown} ${
            isActive ? "" : styles.dropDownClosed
          }`}
        >
          <p className={`${genStyles.midText} ${styles.userHello}`}>
            Привет,{" "}
            <span className={styles.userHelloName}>{user.data.nick}</span>!
          </p>
          <nav>
            <ul className={styles.linksList}>
              <li>
                <a href="#" className={styles.link}>
                  <ProfileIcon
                    className={styles.icon}
                    style={{ fill: "yellow" }}
                  />
                  Профиль
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <AccountIcon
                    className={styles.icon}
                    style={{ fill: "orange" }}
                  />
                  Личный кабинет
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <ShoppingIcon
                    className={styles.icon}
                    style={{ fill: "lightskyblue" }}
                  />
                  Магазин блоков
                </a>
              </li>
            </ul>
          </nav>
          <p className={`${styles.itemWithIcon} ${styles.balance}`}>
            <SavingsIcon
              className={styles.icon}
              style={{ fill: "limegreen" }}
            />
            Баланс: {user.data.money.toLocaleString()} ₽.
          </p>
        </div>
      </div>
    );
  } else {
    return <p>Войти</p>;
  }
};
export default UserMenu;
