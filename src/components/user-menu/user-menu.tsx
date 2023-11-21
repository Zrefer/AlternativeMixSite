import { FC, useEffect, useState } from "react";
import styles from "./user-menu.module.css";

import ProfileIcon from "../../../public/images/profile-icon.svg";
import ShoppingIcon from "../../../public/images/shopping-icon.svg";
import SavingsIcon from "../../../public/images/savings-icon.svg";
import genStyles from "../../styles/generalStyles.module.css";
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { exitUser } from "../../services/user/actions";
import UserIcon from "../user-icon/user-icon";
import { Status } from "../../types/actionStatus";
import LoginMenu from "../login-menu/login-menu";
import Modal from "../modal/modal";

const userSelector = (store: RootState) => {
  return store.userStore;
};

const UserMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isDropDown, setIsDropDown] = useState(false);
  const [isLoginMenu, setIsLoginMenu] = useState(false);
  const { user, authStatus } = useSelector(userSelector);

  const handleLogout = () => {
    dispatch(exitUser());
  };

  const handleClick = () => {
    if (user) setIsDropDown(true);
    else if (authStatus !== Status.Loading) setIsLoginMenu(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!isDropDown || !target) return;
    if (target.closest(`.${styles.userContainer}`)) return;
    if (target.closest(`.${styles.dropDown}`)) return;

    setIsDropDown(false);
  };

  useEffect(() => {
    if (user && isLoginMenu) setIsLoginMenu(false);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropDown, isLoginMenu, user]);

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
                  <a href="#" className={styles.link}>
                    <ProfileIcon
                      className={styles.icon}
                      style={{ fill: "yellow" }}
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
      {!user && isLoginMenu && (
        <Modal onClose={() => setIsLoginMenu(false)}>
          <LoginMenu />
        </Modal>
      )}
    </>
  );
};
export default UserMenu;
