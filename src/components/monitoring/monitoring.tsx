import { FC, useMemo } from "react";
import { monitoring } from "../../data";
import styles from "./monitoring.module.css";
import genStyles from "../../styles/generalStyles.module.css";
import ProgressBar from "../progress-bar/progress-bar";

const Monitoring: FC = () => {
  const { maxOnline, totalOnline } = useMemo(() => {
    if (!monitoring.data) return { maxOnline: 0, totalOnline: 0 };

    return monitoring.data.servers.reduce(
      (result, server) => {
        result.maxOnline += server.max_online;
        result.totalOnline += server.online;
        return result;
      },
      { maxOnline: 0, totalOnline: 0 }
    );
  }, []);

  return (
    <div className={`${genStyles.siteBlock} ${styles.container}`}>
      <h2 className={`${genStyles.title} ${styles.title}`}>Мониторинг</h2>
      <div className={styles.bars}>
        {monitoring.data &&
          monitoring.data.servers.map((server) => (
            <ProgressBar
              key={server.servername}
              val={server.online}
              max={server.max_online}
              name={server.servername}
            />
          ))}
      </div>
      {monitoring.data && (
        <p className={styles.totalInfo}>
          {totalOnline}/{maxOnline}
        </p>
      )}
    </div>
  );
};
export default Monitoring;
