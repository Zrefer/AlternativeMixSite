import { FC, useMemo, useState } from "react";

import { IServerInfoData } from "../../types/servers";
import MinecraftIcon from "../../../public/images/minecraft-icon.png";
import { NonEmptyArray } from "../../types/general";
import ProgressBar from "../progress-bar/progress-bar";
import { RootState } from "../../services/store";
import Tabs from "../tabs/tabs";
import genStyles from "../../styles/generalStyles.module.css";
import styles from "./server-info.module.css";
import { useSelector } from "react-redux";

const monitoringSelector = (store: RootState) => {
  return store.monitoringStore.servers;
};

const ServerInfo: FC<{ serverName: string; serverData: IServerInfoData }> = ({
  serverName,
  serverData,
}) => {
  const iconUrl =
    `https://minecraft.mix-servers.com/assets/main/img/${serverData.icon}` ||
    MinecraftIcon;

  const [isExpanded, setIsExpanded] = useState(false);
  const [donateTab, setDonateTab] = useState<string>();

  const curDonate = useMemo(() => {
    if (serverData.donates.length === 0) return undefined;

    if (donateTab) {
      const donate = serverData.donates.find(
        (donate) => donate.name === donateTab
      );
      return donate ?? serverData.donates[0];
    }
    return serverData.donates[0];
  }, [donateTab, serverData.donates]);

  const monitoring = useSelector(monitoringSelector);
  const serverMonitoring = useMemo(() => {
    return monitoring.find((element) => element.servername === serverName);
  }, [monitoring, serverName]);

  const handleDonateTabChange = (tab: string) => setDonateTab(tab);

  return (
    <div className={genStyles.siteBlock}>
      <div
        className={`${genStyles.siteBlock} ${styles.server}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img
          className={styles.serverIcon}
          src={iconUrl}
          alt={`${serverName} server icon`}
        />
        <p className={styles.serverName}>{serverName}</p>
        <ProgressBar
          extraClass={styles.monitoring}
          val={serverMonitoring?.online ?? 0}
          max={serverMonitoring?.max_online ?? 100}
        />
      </div>
      {isExpanded && (
        <div className={styles.serverInfo}>
          <div>
            <p className={styles.serverDesc}>{serverData.info.description}</p>
            <p className={styles.subTitle}>Установленные модификации:</p>
            <ul className={styles.modsGrid}>
              {serverData.info.mods.map((mod) => (
                <li key={mod.name}>
                  <p className={styles.mod}>
                    {mod.name}
                    {mod.version && <span>{mod.version}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {serverData.info.bannedItems && (
            <div>
              <p className={styles.subTitle}>Запрещённые предметы:</p>
              <ul className={styles.abilitiesList}>
                {serverData.info.bannedItems.map((item) => (
                  <li key={item.item} className={styles.bannedItem}>
                    <span>{item.mod}</span>
                    <span>Запрещено</span>
                    <span> - {item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {serverData.donates.length > 0 && (
            <div>
              <h2 className={`${genStyles.title} ${styles.title}`}>Статусы</h2>
              {serverData.donates.length > 1 && (
                <Tabs
                  tabs={
                    serverData.donates.map(
                      (donate) => donate.name
                    ) as NonEmptyArray<string>
                  }
                  onTabChange={handleDonateTabChange}
                  activeTab={donateTab}
                />
              )}
              {curDonate && (
                <>
                  <h2
                    className={`${genStyles.title} ${styles.title}`}
                    style={{ color: curDonate.color }}
                  >
                    {curDonate.name} - {curDonate.price} ₽/мес.
                  </h2>
                  <div>
                    <p className={styles.subTitle}>
                      Список команд для статуса:
                    </p>
                    <ul className={styles.abilitiesList}>
                      {curDonate.commands.map((command) => (
                        <li key={command.name} className={styles.command}>
                          /{command.name} - <span>{command.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={styles.subTitle}>
                      Дополнительные возможности:
                    </p>
                    <ul className={styles.abilitiesList}>
                      {curDonate.abilities.map((ability) => (
                        <li key={ability}>{ability}</li>
                      ))}
                    </ul>
                  </div>
                  {curDonate.flags && (
                    <div>
                      <p className={styles.subTitle}>
                        Доступные к установке флаги региона:
                      </p>
                      <ul className={styles.abilitiesList}>
                        {curDonate.flags.map((flag) => (
                          <li key={flag.name}>
                            <span className={styles.flag}>{flag.name}</span>
                            <span> - {flag.description}</span>
                          </li>
                        ))}
                      </ul>
                      <p>
                        Пример: /rg flag [Имя вашего региона] [Имя флага]
                        allow(разрешить) или deny(запретить)
                      </p>
                    </div>
                  )}
                  {curDonate.kitsImage && (
                    <div>
                      <p className={styles.subTitle}>Доступные /kit наборы:</p>
                      <img
                        alt="Изображение доступных наборов"
                        src={`https://minecraft.mix-servers.com/assets/main/img/kits/${curDonate.kitsImage}`}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ServerInfo;
