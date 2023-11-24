import { AppDispatch, RootState } from "../../../services/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCabinet } from "../../../services/cabinet/actions";
import genStyles from "../../../styles/generalStyles.module.css";
import styles from "./cabinet-page.module.css";

const groupsSelector = (store: RootState) => {
  if (!store.cabinetStore.cabinet) return null;
  return store.cabinetStore.cabinet.playerGroupList;
};

const CabinetPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const groups = useSelector(groupsSelector);

  useEffect(() => {
    if (!groups) dispatch(fetchCabinet());
  });

  return (
    <>
      <span className={`${genStyles.midText} ${styles.mark}`}>
        Ниже отображены Ваши статусы на наших серверах с указанием срока
        окончания того или иного статуса.
      </span>
      <ul className={styles.statusList}>
        <li className={styles.statusLine}>
          <p className={styles.lineItem}>Название сервера</p>
          <p className={styles.lineItem}>Имеющийся статус</p>
          <p className={styles.lineItem}>Истекает</p>
        </li>
        {groups &&
          groups.map((group) => (
            <li key={group.server} className={styles.statusLine}>
              <p className={styles.lineItem}>{group.server}</p>
              <p className={styles.lineItem}>{group.group}</p>
              <p className={styles.lineItem}>{group.endTime}</p>
            </li>
          ))}
      </ul>
    </>
  );
};
export default CabinetPage;
