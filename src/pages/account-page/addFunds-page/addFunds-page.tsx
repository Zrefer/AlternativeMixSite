import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { payeerData, paypalychData } from "../../../utils/data";

import { IAddFundsForm } from "../../../types/forms";
import { RootState } from "../../../services/store";
import { emptyFieldError } from "../../../utils/formValidation";
import genStyles from "../../../styles/generalStyles.module.css";
import { getPaymentData } from "../../../utils/api";
import { postFormNewTab } from "../../../utils/utils";
import styles from "./addFunds-page.module.css";
import { useSelector } from "react-redux";

const paymentMethods: {
  [key in IAddFundsForm["paymentMethod"]]: string;
} = {
  none: "Выберите способ пополнения",
  qiwi: "QIWI / Банковская карта РФ",
  sbp: "СБП",
  card: "Банковская карта (от 100 ₽)",
  foreignCard: "Банковская карта (в том числе зарубежные)",
  payeer: "Payeer и криптоволюты",
};

const userSelector = (store: RootState) => {
  return store.userStore.user!;
};

const AddFundsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const user = useSelector(userSelector);

  const handleSubmit = (values: IAddFundsForm) => {
    if (isLoading) return;

    setIsLoading(true);
    getPaymentData(values)
      .then((paymentData) => {
        if (paymentData.payment === "payeer") {
          const postData = {
            ...payeerData,
            m_orderid: paymentData.m_orderid,
            m_amount: values.sum,
            m_sign: paymentData.sign,
            m_desc: btoa(user.nick),
          };
          postFormNewTab(postData, "https://payeer.com/merchant/");
        } else if (paymentData.payment === "paypalych") {
          const postData = {
            ...paypalychData,
            sum: values.sum,
            innerID: user.nick,
            email: user.email,
            comment: `Пополнение баланса #${user.nick}`,
            sign: paymentData.sign,
          };
          postFormNewTab(postData, "https://pay.primepayments.ru/API/v1/");
        } else {
          window.open(paymentData.url, "_blank");
        }

        setIsLoading(false);
        setError(undefined);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  const validationSchema = Yup.object({
    sum: Yup.number()
      .when("paymentMethod", {
        is: (value: string) => value === "card",
        then: (schema) =>
          schema.min(
            100,
            "Минимальная сумма для выбранного способа оплаты = 100 ₽"
          ),
        otherwise: (schema) => schema.min(1, "Минимальная сумма = 1 ₽"),
      })
      .required(emptyFieldError),
    paymentMethod: Yup.string().notOneOf(
      ["none"],
      "Выберите способ пополнения"
    ),
  });
  const initialForm: IAddFundsForm = { sum: 100, paymentMethod: "none" };

  return (
    <section className={styles.section}>
      <span className={`${genStyles.midText} ${styles.mark}`}>
        Здесь Вы можете пополнить баланс Вашего счета для оплаты покупок на
        нашем проекте различных товаров: предметов в магазине, зачарования,
        статусов и т.д.
      </span>
      {error && (
        <span
          className={`${genStyles.midText} ${styles.mark} ${styles.errorMsg}`}
        >
          Не удалось выполнить запрос на пополнение счёта: {error.message}
        </span>
      )}
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={styles.form}>
            <div>
              <Field
                id="sum"
                name="sum"
                type="number"
                placeholder="Сумма пополнения"
                className={`${genStyles.midText} ${styles.field}`}
              />
              <ErrorMessage
                name="sum"
                component="p"
                className={styles.errorMsg}
              />
            </div>
            <div>
              <Field
                as="select"
                id="paymentMethod"
                name="paymentMethod"
                className={`${genStyles.midText} ${styles.field} ${styles.selectField}`}
              >
                {Object.entries(paymentMethods).map(([key, value]) => {
                  return (
                    <option key={key} value={key} disabled={key === "none"}>
                      {value}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                name="paymentMethod"
                component="p"
                className={styles.errorMsg}
              />
            </div>
            <button
              type="submit"
              className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
              disabled={!formik.isValid || !formik.dirty || isLoading}
            >
              Пополнить
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default AddFundsPage;
