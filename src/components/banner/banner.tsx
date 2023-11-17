import { FC } from "react";
import styles from "./banner.module.css";

const Banner: FC = () => {
  return (
    <img
      className={styles.image}
      src="https://minecraft.mix-servers.com/assets/main/img/banner-min.png"
    />
  );
};
export default Banner;
