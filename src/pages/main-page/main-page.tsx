import { Outlet, useLocation, useNavigate } from "react-router";

import { FC } from "react";
import Tabs from "../../components/tabs/tabs";
import styles from "./main-page.module.css";

enum Tab {
  feed = "Новости",
  servers = "Сервера",
}

const MainPage: FC = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const handleTabChange = (tab: string) => {
    const validTabs = Object.values(Tab) as string[];
    if (!validTabs.includes(tab)) return;

    switch (tab as Tab) {
      case Tab.feed:
        navigate("/");
        return;
      case Tab.servers:
        navigate("/servers");
        return;
    }
  };

  const getActiveTab = () => {
    if (currentPath === "/") {
      return Tab.feed;
    } else if (currentPath === "/servers") {
      return Tab.servers;
    }
  };

  return (
    <>
      <div className={styles.tabs}>
        <Tabs
          activeTab={getActiveTab()}
          tabs={[Tab.feed, Tab.servers]}
          onTabChange={handleTabChange}
        />
      </div>
      <Outlet />
    </>
  );
};
export default MainPage;
