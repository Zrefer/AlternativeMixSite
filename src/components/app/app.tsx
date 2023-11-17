import { FC } from "react";
import styles from "./app.module.css";
import Header from "../header/header";
import Content from "../content/content";
import Footer from "../footer/footer";

const App: FC = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
export default App;
