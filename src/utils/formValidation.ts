import * as Yup from "yup";

export const emptyFieldError = "Заполните это поле";

export const usernameValidator = Yup.string()
  .required(emptyFieldError)
  .min(4, "Ник должен быть длиннее 4 символов")
  .max(16, "Ник должен быть короче 16 символов")
  .matches(
    /^[a-zA-Z0-9_-]+$/,
    "Ник может содержать только латинские символы, цифры, нижнее подчеркивание и дефис"
  );

export const passwordValidator = Yup.string()
  .required(emptyFieldError)
  .min(8, "Пароль должен быть длиннее 8 символов")
  .max(50, "Уж слишком длинный пароль...")
  .matches(
    /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я]).*$/,
    "Пароль должен содержать как минимум 1 символ, 1 цифру и 1 символ в верхнем регистре"
  );

export const emailValidator = Yup.string().required(emptyFieldError).email();
