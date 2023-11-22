import { FC } from "react";
import Banner from "../banner/banner";
import styles from "./content.module.css";
import Feed from "../feed/feed";
import { Outlet } from "react-router";

const Content: FC = () => {
  return (
    <main className={styles.main}>
      <Banner />
      <Feed />
      <Outlet />
    </main>
  );
};
export default Content;
