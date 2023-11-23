import Banner from "../banner/banner";
import { FC } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import { Outlet } from "react-router";
import styles from "./content.module.css";

const Content: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Banner />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Content;
