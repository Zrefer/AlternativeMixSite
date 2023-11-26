import * as Yup from "yup";

import { AppDispatch, RootState } from "../../../services/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IChangePassForm } from "../../../types/forms";
import { changeUserPasswordRequest } from "../../../utils/api";
import { fetchCabinet } from "../../../services/cabinet/actions";
import genStyles from "../../../styles/generalStyles.module.css";
import { passwordValidator } from "../../../utils/formValidation";
import styles from "./cabinet-page.module.css";

const groupsSelector = (store: RootState) => {
  if (!store.cabinetStore.cabinet) return null;
  return store.cabinetStore.cabinet.playerGroupList;
};

const userSelector = (store: RootState) => {
  return store.userStore.user!;
};

const CabinetPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    texts: string[];
    isError: boolean;
  }>();

  const groups = useSelector(groupsSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!groups) dispatch(fetchCabinet());
  });

  const handleSubmit = (values: IChangePassForm) => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage(undefined);

    changeUserPasswordRequest(values)
      .then((response) => {
        if (response.status === 0) {
          setMessage({ texts: [response.msg], isError: false });
        } else if (response.data) {
          setMessage({
            texts: [response.msg, ...response.data],
            isError: true,
          });
        } else {
          setMessage({
            texts: [response.msg],
            isError: true,
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setMessage({
          texts: ["Не удалось сменить пароль. Возникла непредвиденняа ошибка"],
          isError: true,
        });
        setIsLoading(false);
      });
  };

  const validationSchema = Yup.object({
    password: passwordValidator,
    new_password: passwordValidator,
    new_password_confirmed: Yup.string().oneOf(
      [Yup.ref("new_password")],
      "Пароли не совпадают"
    ),
  });

  const initialForm: IChangePassForm = {
    new_password: "",
    new_password_confirmed: "",
    password: "",
  };

  return (
    <>
      <div className={styles.info}>
        <p className={genStyles.midText}>E-mail: {user.email}</p>
        <p className={genStyles.midText}>Регистрация: {user.reg_date}</p>
      </div>
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
      <span className={`${genStyles.midText} ${styles.mark}`}>
        Ниже вы можете сменить ваш пароль на новый. Рекомендуем делать это как
        можно чаще для вашей безопасности
      </span>
      <div className={styles.changePassword}>
        <Formik
          initialValues={initialForm}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={styles.form}>
              <div>
                <Field
                  id="password"
                  name="password"
                  placeholder="Ваш пароль"
                  type="password"
                  autoComplete="current-password"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              <div>
                <Field
                  id="new_password"
                  name="new_password"
                  placeholder="Придумайте новый пароль"
                  type="password"
                  autoComplete="new-password"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="new_password"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              <div>
                <Field
                  id="new_password_confirmed"
                  name="new_password_confirmed"
                  placeholder="Повторите новый пароль"
                  type="password"
                  autoComplete="new-password"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="new_password_confirmed"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              {message &&
                message.texts.map((text) => (
                  <span
                    key={text}
                    className={`${genStyles.midText} ${styles.mark} ${
                      message.isError && styles.errorMsg
                    }`}
                  >
                    {text}
                  </span>
                ))}
              <button
                type="submit"
                className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                disabled={!formik.isValid || !formik.dirty || isLoading}
              >
                {isLoading ? "Смена пароля..." : "Сменить пароль"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default CabinetPage;
