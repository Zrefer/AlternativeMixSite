import { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

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

const nickSelector = (store: RootState) => {
  return store.userStore.user!.nick;
};

const AccountPage: FC = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const nick = useSelector(nickSelector);

  const [skinImage, setSkinImage] = useState<HTMLImageElement | ImageBitmap>();
  const [capeImage, setCapeImage] = useState<HTMLImageElement | ImageBitmap>();

  useEffect(() => {
    if (nick) {
      loadImageNoCors(`https://files.mix-servers.com/web/skins/${nick}.png`)
        .then((image) => setSkinImage(image))
        .catch((error) => console.log(error));
      loadImageNoCors(`https://files.mix-servers.com/web/cloaks/${nick}.png`)
        .then((image) => setCapeImage(image))
        .catch((error) => console.log(error));
    }

    return () => {
      setSkinImage(undefined);
      setCapeImage(undefined);
    };
  }, [nick]);

  const handleTabChange = (tab: string) => {
    const validTabs = Object.values(Tab) as string[];
    if (!validTabs.includes(tab)) return;

    switch (tab as Tab) {
      case Tab.info:
        navigate("/account");
        return;
      case Tab.addFunds:
        navigate("/account/addFunds");
        return;
      case Tab.buyStatus:
        navigate("/account/buyStatus");
        return;
    }
  };

  const getActiveTab = () => {
    if (currentPath === "/account") {
      return Tab.info;
    } else if (currentPath === "/account/addFunds") {
      return Tab.addFunds;
    } else if (currentPath === "/account/buyStatus") {
      return Tab.buyStatus;
    }
  };

  return (
    <section className={`${genStyles.siteBlock} ${styles.section}`}>
      <h1 className={`${genStyles.mainTitle} ${styles.title}`}>
        Личный кабинет
      </h1>
      <Tabs
        activeTab={getActiveTab()}
        tabs={[Tab.info, Tab.addFunds, Tab.buyStatus]}
        onTabChange={handleTabChange}
      />
      <div className={styles.content}>
        <div>
          <SkinView
            skin={{
              skin: skinImage || SteveSkin,
              cape: capeImage,
              nameTag: nick,
            }}
            view={{
              width: 200,
              height: 300,
              light: 3,
              zoom: 0.7,
              rotate: 30,
              SSRFactor: 3,
            }}
            controls={{
              zoom: true,
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
