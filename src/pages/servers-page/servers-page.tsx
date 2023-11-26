import { FC, useEffect } from "react";

import { AppDispatch } from "../../services/store";
import ServerInfo from "../../components/server-info/server-info";
import { fetchMonitoring } from "../../services/monitoring/actions";
import { serversData } from "../../utils/data";
import styles from "./servers-page.module.css";
import { useDispatch } from "react-redux";

const ServersPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMonitoring());
    const interval = setInterval(() => dispatch(fetchMonitoring()), 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <ul className={styles.serversList}>
        {Object.entries(serversData).map(([key, value]) => (
          <li key={key} className={styles.server}>
            <ServerInfo serverName={key} serverData={value} />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ServersPage;
