import * as Yup from "yup";

import { AppDispatch, RootState } from "../../services/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "../../utils/formValidation";
import { useDispatch, useSelector } from "react-redux";

import { FC } from "react";
import { IRegisterForm } from "../../types/forms";
import Modal from "../modal/modal";
import { Status } from "../../types/actionStatus";
import genStyles from "../../styles/generalStyles.module.css";
import { registerUser } from "../../services/user/actions";
import styles from "./register-menu.module.css";
import useModalNavigate from "../../hooks/useModalNavigate";

const authStatusSelector = (store: RootState) => {
  return store.userStore.authStatus;
};

const RegisterMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalBackOrNavigate, modalNavigate } = useModalNavigate();

  const authStatus = useSelector(authStatusSelector);

  const handleSubmit = (values: IRegisterForm) => {
    if (authStatus === Status.Loading) return;
    dispatch(registerUser(values));
  };

  const validationSchema = Yup.object({
    nick: usernameValidator,
    password: passwordValidator,
    password2: Yup.string().oneOf([Yup.ref("password")], "Пароли не совпадают"),
    email: emailValidator,
  });
  const initialForm: IRegisterForm = {
    nick: "",
    password: "",
    password2: "",
    email: "",
  };

  return (
    <Modal onClose={() => modalBackOrNavigate("/")}>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <>
            <h2 className={`${genStyles.title} ${styles.title}`}>
              Регистрация
            </h2>
            <Form className={styles.form}>
              <div>
                <Field
                  id="nick"
                  name="nick"
                  placeholder="Придумайте никнейм"
                  autoComplete="username"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="nick"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              <div>
                <Field
                  id="email"
                  name="email"
                  placeholder="Ваша электронная почта"
                  autoComplete="email"
                  type="email"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              <div>
                <Field
                  id="password"
                  name="password"
                  placeholder="Придумайте пароль"
                  type="password"
                  autoComplete="new-password"
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
                  id="password2"
                  name="password2"
                  placeholder="Повторите пароль"
                  type="password"
                  autoComplete="new-password"
                  className={`${genStyles.midText} ${styles.field}`}
                />
                <ErrorMessage
                  name="password2"
                  component="p"
                  className={styles.errorMsg}
                />
              </div>
              <span
                className={styles.registeredLink}
                onClick={() => modalNavigate("/login")}
              >
                Уже зарегистрированы?
              </span>
              <button
                type="submit"
                className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  authStatus === Status.Loading
                }
              >
                {authStatus === Status.Loading
                  ? "Регистрация..."
                  : "Зарегистрироваться"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};
export default RegisterMenu;
