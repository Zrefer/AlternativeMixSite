import { FC, MouseEventHandler, useState } from "react";

import { NonEmptyArray } from "../../types/general";
import genStyles from "../../styles/generalStyles.module.css";
import styles from "./tabs.module.css";

interface TabsProps {
  tabs: NonEmptyArray<string>;
  defaultTab?: string;
  onTabChange: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const tabName = event.currentTarget.name;
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <ul
      className={styles.list}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
    >
      {tabs.map((tab) => (
        <li key={tab} className={styles.listItem}>
          <button
            type="button"
            name={tab}
            className={`${styles.tab} ${genStyles.midText} ${
              activeTab === tab ? styles.tabActive : ""
            }`}
            onMouseDown={handleTabClick}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Tabs;
