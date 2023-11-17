import { FC } from "react";
import Banner from "../banner/banner";
import styles from "./content.module.css";
import Feed from "../feed/feed";
import Monitoring from "../monitoring/monitoring";

const Content: FC = () => {
  return (
    <main className={styles.main}>
      <Banner />
      <Feed />
    </main>
  );
};
export default Content;
