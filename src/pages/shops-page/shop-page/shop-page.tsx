import { FC, useMemo, useState } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../services/store";
import genStyles from "../../../styles/generalStyles.module.css";
import styles from "./shop-page.module.css";
import { useSelector } from "react-redux";

interface FilterForm {
  name: string;
  category: string;
}

const shopsSelector = (store: RootState) => {
  return store.shopStore.shops;
};

const balanceSelector = (store: RootState) => {
  return store.userStore.user!.money;
};

const ShopPage: FC = () => {
  const navigate = useNavigate();

  const { shopId } = useParams();
  const shops = useSelector(shopsSelector);
  const balance = useSelector(balanceSelector);

  const initialFilter: FilterForm = {
    name: "",
    category: "",
  };
  const [filter, setFilter] = useState<FilterForm>(initialFilter);

  const shop = useMemo(
    () => shops.find((shop) => shop.id.toString() === shopId),
    [shopId, shops]
  );
  const filteredItems = useMemo(() => {
    return (
      shop?.items
        .filter((item) => {
          if (filter.name !== "") {
            const lowerName = item.item_name.toLowerCase();
            const lowerId = item.item_id.toString().toLowerCase();
            const lowerFilter = filter.name.toLowerCase();

            if (
              !lowerName.includes(lowerFilter) &&
              !lowerId.includes(lowerFilter)
            ) {
              return false;
            }
          }

          if (filter.category !== "") {
            const categories = item.categories.split("|");
            if (!categories.includes(filter.category)) return false;
          }
          return true;
        })
        .sort((a, b) => {
          const sortA = parseInt(a.sort, 10);
          const sortB = parseInt(b.sort, 10);
          return sortA - sortB;
        }) ?? []
    );
  }, [filter.category, filter.name, shop?.items]);

  if (!shop) return <Navigate to="/404" />;

  return (
    <div className={`${genStyles.siteBlock} ${styles.container}`}>
      <h2 className={`${genStyles.title} ${styles.title}`}>Магазин блоков</h2>
      <div className={styles.filterForm}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Поиск по id / названию"
          autoComplete="off"
          value={filter.name}
          className={`${genStyles.midText} ${styles.filterField}`}
          onChange={(event) =>
            setFilter({ ...filter, name: event.target.value })
          }
        />
        <select
          id="category"
          name="category"
          value={filter.category}
          className={`${genStyles.midText} ${styles.filterField} ${styles.categoryFilterField}`}
          onChange={(event) =>
            setFilter({ ...filter, category: event.target.value })
          }
        >
          <option value="">Все предметы</option>
          {shop.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.itemsTable}>
        <tbody>
          <tr>
            <td />
            <td>Название предмета</td>
            <td />
            <td className={styles.itemPrice}>Цена</td>
          </tr>
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={
                item.price > balance ? styles.itemRow : styles.itemRowClickable
              }
              onClick={
                item.price > balance
                  ? undefined
                  : () => navigate(`/shop/${shopId}/buy/${item.id}`)
              }
            >
              <td>
                <img
                  src={item.img}
                  alt={item.item_name}
                  className={styles.itemImg}
                />
              </td>
              <td className={styles.itemName}>{item.item_name}</td>
              <td>
                {item.enchant && (
                  <span className={styles.enchantable}>Можно зачаровать</span>
                )}
              </td>
              <td className={styles.itemPrice}>
                {item.price}₽ за {item.stack}шт
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};
export default ShopPage;
