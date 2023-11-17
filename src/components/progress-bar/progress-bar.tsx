import { FC } from "react";
import styles from "./progress-bar.module.css";

const ProgressBar: FC<{
  val: number;
  max: number;
  name: string;
  color?: string;
  extraClass?: string;
}> = ({ val, max, name, extraClass, color }) => {
  const progress = (val / max) * 100 + "%";

  return (
    <div className={`${styles.container} ${extraClass}`}>
      <div className={styles.progressBox}>
        <div
          className={styles.progressBar}
          style={{ width: progress, backgroundColor: color || "#55AAEE" }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.value}>
          {val}/{max}
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
