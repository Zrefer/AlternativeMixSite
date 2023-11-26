import { AppDispatch, RootState } from "../../services/store";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ProfileIcon from "../../../public/images/profile-icon.svg";
import SavingsIcon from "../../../public/images/savings-icon.svg";
import ShoppingIcon from "../../../public/images/shopping-icon.svg";
import { Status } from "../../types/general";
import UserIcon from "../user-icon/user-icon";
import genStyles from "../../styles/generalStyles.module.css";
import { logoutUser } from "../../services/user/actions";
import styles from "./user-menu.module.css";
import useModalNavigate from "../../hooks/useModalNavigate";

const userSelector = (store: RootState) => {
  return store.userStore;
};

const UserMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalNavigate } = useModalNavigate();

  const [isDropDown, setIsDropDown] = useState(false);
  const { user, authStatus } = useSelector(userSelector);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleClick = () => {
    if (user) setIsDropDown(true);
    else {
      modalNavigate("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!isDropDown || !target) return;
      if (target.closest(`.${styles.userContainer}`)) return;
      if (target.closest(`.${styles.dropDown}`)) return;

      setIsDropDown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropDown]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userContainer} onClick={handleClick}>
          {user ? (
            <>
              <UserIcon playerName={user.nick} />
              <span className={`${genStyles.midText} ${styles.userName}`}>
                {user.nick}
              </span>
            </>
          ) : (
            <>
              {(() => {
                switch (authStatus) {
                  case Status.Loading:
                    return <p>Вход...</p>;
                  default:
                    return <p>Войти</p>;
                }
              })()}
            </>
          )}
        </div>
        {user && (
          <div
            className={`${styles.dropDown} ${
              isDropDown ? styles.dropDownOpened : ""
            }`}
          >
            <p className={`${genStyles.midText} ${styles.userHello}`}>
              Привет, <span className={styles.userHelloName}>{user.nick}</span>!
            </p>
            <p className={styles.balance}>
              <SavingsIcon
                className={styles.icon}
                style={{ fill: "limegreen" }}
              />
              Баланс: {user.money.toLocaleString()} ₽.
            </p>
            <nav>
              <ul className={styles.linksList}>
                <li>
                  <Link to="/account" className={styles.link}>
                    <ProfileIcon
                      className={styles.icon}
                      style={{ fill: "yellow" }}
                    />
                    Личный кабинет
                  </Link>
                </li>
                <li>
                  <Link to="#" className={styles.link}>
                    <ShoppingIcon
                      className={styles.icon}
                      style={{ fill: "lightskyblue" }}
                    />
                    Магазин блоков
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              type="button"
              className={`${genStyles.button} ${styles.logoutBtn}`}
              onClick={handleLogout}
            >
              Выход
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default UserMenu;
