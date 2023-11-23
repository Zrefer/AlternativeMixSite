import * as Yup from "yup";

import { AppDispatch, RootState } from "../../services/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  passwordValidator,
  usernameValidator,
} from "../../utils/formValidation";
import { useDispatch, useSelector } from "react-redux";

import { FC } from "react";
import { ILoginForm } from "../../types/forms";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import { Status } from "../../types/actionStatus";
import genStyles from "../../styles/generalStyles.module.css";
import { loginUser } from "../../services/user/actions";
import styles from "./login-menu.module.css";
import useModalNavigate from "../../hooks/useModalNavigate";

const authStatusSelector = (store: RootState) => {
  return store.userStore.authStatus;
};

const LoginMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalBackOrNavigate, modalNavigate } = useModalNavigate();

  const authStatus = useSelector(authStatusSelector);

  const handleSubmit = (values: ILoginForm) => {
    if (authStatus === Status.Loading) return;
    dispatch(loginUser(values));
  };

  const validationSchema = Yup.object({
    username: usernameValidator,
    password: passwordValidator,
  });
  const initialForm: ILoginForm = { username: "", password: "" };

  return (
    <Modal onClose={() => modalBackOrNavigate("/")}>
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
                <span
                  className={styles.link}
                  onClick={() => modalNavigate("/register")}
                >
                  Регистрация
                </span>
                <Link
                  to="https://minecraft.mix-servers.com/reset-password"
                  className={styles.link}
                >
                  Забыли пароль?
                </Link>
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
    </Modal>
  );
};

export default LoginMenu;
