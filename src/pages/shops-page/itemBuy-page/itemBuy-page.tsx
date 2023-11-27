import { AppDispatch, RootState } from "../../../services/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, ReactNode, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IBuyItemForm } from "../../../types/forms";
import { IShopEnchant } from "../../../types/shop";
import Modal from "../../../components/modal/modal";
import { buyItem } from "../../../utils/api";
import genStyles from "../../../styles/generalStyles.module.css";
import styles from "./itemBuy-page.module.css";
import { updateBalance } from "../../../services/user/actions";

const shopStoreSelector = (store: RootState) => {
  return store.shopStore;
};

const balanceSelector = (store: RootState) => {
  return store.userStore.user!.money;
};

const ItemBuyPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { shopId, itemId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean }>();

  const { shops, enchants } = useSelector(shopStoreSelector);
  const balance = useSelector(balanceSelector);

  const shop = useMemo(
    () => shops.find((shop) => shop.id.toString() === shopId),
    [shopId, shops]
  );
  const item = useMemo(
    () => shop?.items.find((item) => item.id.toString() === itemId),
    [itemId, shop?.items]
  );
  if (!item) return <Navigate to="/404" />;

  const calcSum = (values: IBuyItemForm): number => {
    const itemSum = (values.count / item.stack) * item.price;
    const enchantsSum = Object.entries(values.enchant).reduce(
      (result, [enchantId, amount]) => {
        const enchant = enchants.find(
          (enchant) => enchant.enchant_id === enchantId
        );
        if (!enchant) return result;

        return result + enchant.price * amount;
      },
      0
    );
    return itemSum + enchantsSum;
  };

  const getEnchantField = (
    values: IBuyItemForm,
    enchant: IShopEnchant
  ): ReactNode => {
    const curLvl = values.enchant[enchant.enchant_id];
    const remainBalance = balance - calcSum(values) + curLvl * enchant.price;
    const maxLvl = Math.floor(remainBalance / enchant.price);
    const fieldMaxLvl = Math.min(Math.max(maxLvl, curLvl), enchant.max_lvl);

    const lvlPercent = (curLvl / fieldMaxLvl) * 100;

    return (
      <Field
        id={`enchant.${enchant.enchant_id}`}
        name={`enchant.${enchant.enchant_id}`}
        type="range"
        min="0"
        max={fieldMaxLvl}
        className={styles.enchantField}
        style={{
          background: `linear-gradient(to right, 
            rgba(255, 255, 255, .2) ${lvlPercent}%, 
            rgba(255, 255, 255, .2) ${lvlPercent}%, 
            rgba(0, 0, 0, .4) ${lvlPercent}%, 
            rgba(0, 0, 0, .4) 100%)`,
        }}
      />
    );
  };

  const handleSubmit = (values: IBuyItemForm) => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage(undefined);

    buyItem(values)
      .then((message) => {
        setMessage({ text: message, isError: false });
        setIsLoading(false);

        dispatch(updateBalance());
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          text: `Не удалось совершить покупку. ${error}`,
          isError: true,
        });
        setIsLoading(false);
      });
  };

  const validator = (
    values: IBuyItemForm
  ): { [key in keyof IBuyItemForm]?: string } => {
    if (values.count % item.stack !== 0) {
      return { count: `Количество предметов должно быть кратно ${item.stack}` };
    }

    if ((values.count / item.stack) * item.price > balance) {
      return {
        count:
          "У вас не хватает средств для покупки этого предмета в таком количестве",
      };
    }

    if (calcSum(values) > balance) {
      return {
        enchant:
          "У вас не хватает средств для покупки этого предмета с такими зачарованиями",
      };
    }
    return {};
  };

  const initialForm: IBuyItemForm = {
    count: item.stack,
    enchant: enchants.reduce<IBuyItemForm["enchant"]>((result, enchant) => {
      result[enchant.enchant_id] = 0;
      return result;
    }, {}),
    item_id: item.item_id,
    shop_id: shopId!,
  };

  return (
    <Modal onClose={() => navigate(`/shop/${shopId}`)}>
      <div className={styles.container}>
        <h2 className={`${genStyles.title} ${styles.title}`}>
          {item.item_name}
        </h2>
        <div className={styles.info}>
          <img src={item.img} className={styles.itemImg} alt={item.item_name} />
          <p className={genStyles.midText}>
            Описание предмета:
            <p className={styles.itemDesc}>{item.description}</p>
          </p>
        </div>
        <Formik
          initialValues={initialForm}
          onSubmit={handleSubmit}
          validate={validator}
        >
          {(formik) => (
            <Form className={styles.form}>
              {item.enchant ? (
                <>
                  <table className={styles.enchantsTable}>
                    <tbody>
                      {enchants.map((enchant) => (
                        <tr key={enchant.enchant_id}>
                          <td>{enchant.name}</td>
                          <td>{getEnchantField(formik.values, enchant)}</td>
                          <td>{formik.values.enchant[enchant.enchant_id]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className={styles.sum}>Итог: {calcSum(formik.values)}₽</p>
                </>
              ) : (
                <div className={styles.countRow}>
                  <label htmlFor="count" className={genStyles.midText}>
                    Количество
                  </label>
                  <Field
                    type="number"
                    min={item.stack}
                    max={Math.floor(balance / item.price) * item.stack}
                    step={item.stack}
                    id="count"
                    name="count"
                    autoComplete="off"
                    className={`${genStyles.midText} ${styles.field} ${styles.countField}`}
                  />
                  <p className={`${genStyles.midText} ${styles.sum}`}>
                    Итог: {calcSum(formik.values)}₽
                  </p>
                </div>
              )}
              <ErrorMessage
                name="enchant"
                component="p"
                className={styles.errorMsg}
              />
              <ErrorMessage
                name="count"
                component="p"
                className={styles.errorMsg}
              />
              {message && (
                <p
                  className={`${styles.message} ${
                    message.isError ? styles.errorMsg : ""
                  }`}
                >
                  {message.text}
                </p>
              )}
              <button
                type="submit"
                className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                disabled={!formik.isValid || isLoading}
              >
                {isLoading ? "Покупка..." : "Купить"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default ItemBuyPage;
