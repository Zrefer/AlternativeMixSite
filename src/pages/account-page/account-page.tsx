import { FC, useEffect, useState } from "react";

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
    <section className={`${genStyles.siteBlock} ${styles.container}`}>
      <h1 className={`${genStyles.mainTitle} ${styles.title}`}>
        Личный кабинет
      </h1>
      <Tabs
        tabs={[Tab.info, Tab.addFunds, Tab.buyStatus]}
        onTabChange={(tab) => {}}
      />
      <div className={styles.content}>
        <div className={styles.skin}>
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
        <div className={styles.info}>
          <i className={`${genStyles.midText} ${styles.mark}`}>
            Ниже отображены Ваши статусы на наших серверах с указанием срока
            окончания того или иного статуса.
          </i>
          <div className={styles.statusGrid}>
            <p className={styles.serverName}>Название сервера</p>
            <p className={styles.status}>Имеющийся статус</p>
            <p className={styles.expires}>Истекает</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AccountPage;
