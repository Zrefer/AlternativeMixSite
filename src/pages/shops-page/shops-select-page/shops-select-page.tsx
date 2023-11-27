import { FC } from "react";
import { RootState } from "../../../services/store";
import genStyles from "../../../styles/generalStyles.module.css";
import styles from "./shops-select-page.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const shopsSelector = (store: RootState) => {
  return store.shopStore.shops;
};

const ShopsSelectPage: FC = () => {
  const navigate = useNavigate();

  const shops = useSelector(shopsSelector);

  return (
    <>
      {shops.map((shop) => (
        <div
          key={shop.id}
          className={`${genStyles.siteBlock} ${styles.shop}`}
          onClick={() => navigate(`/shop/${shop.id}`)}
        >
          <img
            className={styles.shopIcon}
            src={`https://minecraft.mix-servers.com/${shop.img}`}
            alt={`${shop.shop_name} shop icon`}
          />
          <div>
            <p className={styles.shopName}>{shop.shop_name}</p>
            <p>В магазине {shop.count} товаров.</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default ShopsSelectPage;
