import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ILoginForm } from "../../types/user";
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../services/user/actions";
import { FC } from "react";
import styles from "./login-menu.module.css";
import genStyles from "../../styles/generalStyles.module.css";
import { Status } from "../../types/actionStatus";

const authStatusSelector = (store: RootState) => {
  return store.userStore.authStatus;
};

const LoginMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Заполните это поле")
      .min(4, "Ник должен быть длиннее 4 символов")
      .max(16, "Ник должен быть короче 16 символов")
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Ник может содержать только латинские символы, цифры, нижнее подчеркивание и дефис"
      ),
    password: Yup.string()
      .required("Заполните это поле")
      .min(8, "Пароль должен быть длиннее 8 символов")
      .max(50, "Уж слишком длинный пароль...")
      .matches(
        /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я]).*$/,
        "Пароль должен содержать как минимум 1 символ, 1 цифру и 1 символ в верхнем регистре"
      ),
  });

  const authStatus = useSelector(authStatusSelector);

  const handleSubmit = (values: ILoginForm) => {
    if (authStatus === Status.Loading) return;
    dispatch(authUser(values));
  };

  const initialForm: ILoginForm = { username: "", password: "" };

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <>
          <h2 className={`${genStyles.title} ${styles.title}`}>Вход</h2>
          <Form className={styles.form}>
            <div>
              <Field
                id="username"
                name="username"
                placeholder="Ваш никнейм"
                autoComplete="username"
                className={`${genStyles.midText} ${styles.field}`}
              />
              <ErrorMessage
                name="username"
                component="p"
                className={styles.errorMsg}
              />
            </div>
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
            <div className={styles.links}>
              <a href="#">Регистрация</a>
              <a href="#">Забыли пароль?</a>
            </div>
            <button
              type="submit"
              className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                authStatus === Status.Loading
              }
            >
              {authStatus === Status.Loading ? "Вход..." : "Войти"}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginMenu;
