import { FC, useEffect, useState } from "react";

import { Outlet } from "react-router";
import { RootState } from "../../services/store";
import SkinView from "../../components/skin-view/skin-view";
import SteveSkin from "../../../public/images/steve-skin.png";
import Tabs from "../../components/tabs/tabs";
import genStyles from "../../styles/generalStyles.module.css";
import { loadImageNoCors } from "../../utils/utils";
import styles from "./account-page.module.css";
import { useSelector } from "react-redux";

enum Tab {
  info = "Информация",
  addFunds = "Пополнение счёта",
  buyStatus = "Покупка статуса",
}

const userSelector = (store: RootState) => {
  return store.userStore.user;
};

const AccountPage: FC = () => {
  const user = useSelector(userSelector);

  const [skinImage, setSkinImage] = useState<HTMLImageElement | ImageBitmap>();
  const [capeImage, setCapeImage] = useState<HTMLImageElement | ImageBitmap>();

  useEffect(() => {
    if (!user) return;

    loadImageNoCors(`https://files.mix-servers.com/web/skins/${user.nick}.png`)
      .then((image) => setSkinImage(image))
      .catch((error) => console.log(error));
    loadImageNoCors(`https://files.mix-servers.com/web/cloaks/${user.nick}.png`)
      .then((image) => setCapeImage(image))
      .catch((error) => console.log(error));

    return () => {
      setSkinImage(undefined);
      setCapeImage(undefined);
    };
  }, [user]);

  return (
    <section className={`${genStyles.siteBlock} ${styles.section}`}>
      <h1 className={`${genStyles.mainTitle} ${styles.title}`}>
        Личный кабинет
      </h1>
      <Tabs
        tabs={[Tab.info, Tab.addFunds, Tab.buyStatus]}
        onTabChange={(tab) => {}}
      />
      <div className={styles.content}>
        <div>
          <SkinView
            skin={{
              skin: skinImage || SteveSkin,
              cape: capeImage,
              nameTag: user ? user.nick : undefined,
            }}
            view={{
              width: 200,
              height: 300,
              light: 3,
              zoom: 0.7,
              rotate: 30,
              SSRFactor: 3,
            }}
          />
        </div>
        <div className={styles.pageContainer}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default AccountPage;
