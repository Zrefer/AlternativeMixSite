import { AppDispatch, RootState } from "../../services/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router";
import { Status } from "../../types/general";
import { fetchShop } from "../../services/shop/actions";
import shopSlice from "../../services/shop/slices";
import styles from "./shops-page.module.css";

const shopStatusSelector = (store: RootState) => {
  return store.shopStore.status;
};

const ShopsPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const loadStatus = useSelector(shopStatusSelector);

  useEffect(() => {
    dispatch(fetchShop());
    return () => {
      dispatch(shopSlice.actions.resetShop());
    };
  }, [dispatch]);

  return (
    <section className={styles.section}>
      {loadStatus === Status.Succeeded && <Outlet />}
    </section>
  );
};
export default ShopsPage;
