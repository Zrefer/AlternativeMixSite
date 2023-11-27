import * as Yup from "yup";

import { AppDispatch, RootState } from "../../../services/store";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { IBuyGroupForm } from "../../../types/forms";
import { buyGroup } from "../../../utils/api";
import { fetchCabinet } from "../../../services/cabinet/actions";
import genStyles from "../../../styles/generalStyles.module.css";
import styles from "./buyStatus-page.module.css";
import { updateBalance } from "../../../services/user/actions";

const cabinetSelector = (store: RootState) => {
  return store.cabinetStore.cabinet;
};

const userSelector = (store: RootState) => {
  return store.userStore.user!;
};

const BuyStatusPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean }>();
  const [confirmMsg, setConfirmMsg] = useState<string>();

  const user = useSelector(userSelector);
  const cabinet = useSelector(cabinetSelector);

  useEffect(() => {
    if (!cabinet) dispatch(fetchCabinet());
  }, [cabinet, dispatch]);
  if (!cabinet) return;

  const handleSubmit = (values: IBuyGroupForm) => {
    if (isLoading) return;

    setIsLoading(true);
    setConfirmMsg(undefined);
    setMessage(undefined);

    buyGroup(values)
      .then((data) => {
        if (data.error) {
          setMessage({
            text: `Ошибка при покупке статуса: ${data.error}`,
            isError: true,
          });
        } else if (data.changeGroup) setConfirmMsg(data.message);
        else {
          const msg = data.success || data.message;
          if (msg) {
            setMessage({ text: msg, isError: false });
            dispatch(updateBalance());
            dispatch(fetchCabinet());
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage({
          text: "Ошибка при покупке статуса. Проверьте корректность выбора.",
          isError: true,
        });
        setIsLoading(false);
      });
  };

  const getTotalPrice = (values: IBuyGroupForm) => {
    const group = cabinet.priceList.find(
      (group) =>
        group.serverSuffix === values.serverId &&
        group.name === values.groupName
    );
    if (!group) return undefined;

    return `${group.price * values.monthsNum} ₽`;
  };

  const validationSchema = Yup.object({
    serverId: Yup.string().required("Выберите сервер"),
    groupName: Yup.string().required("Выберите статус"),
    monthsNum: Yup.number()
      .min(1, "Минимальное срок статуса - 1 месяц")
      .required("Укажите срок статуса"),
  });

  const validator = (
    values: IBuyGroupForm
  ): { [key in keyof IBuyGroupForm]?: string } => {
    const server = cabinet.serverList.find(
      (serverEl) => serverEl.permissionName === values.serverId
    );
    if (!server) return { serverId: "Выберите сервер из списка" };

    const groups = cabinet.priceList.filter(
      (price) => price.serverSuffix === server.permissionName
    );
    if (groups.length === 0) {
      return { serverId: "На этом сервере нет статусов" };
    }

    const group = groups.find((groupEl) => groupEl.name === values.groupName);
    if (!group) {
      return {
        groupName: "Выберите статус для выбранного сервера из списка",
      };
    }

    if (group.price > user.money) {
      return {
        groupName: "У вас не хватает средств для покупки этого статуса",
      };
    }
    if (group.price * values.monthsNum > user.money) {
      return {
        monthsNum:
          "У вас не хватает средств для покупки этого статуса на такой срок",
      };
    }
    return {};
  };

  const initialForm: IBuyGroupForm = {
    changeGroup: false,
    groupName: "",
    monthsNum: 1,
    serverId: "",
  };

  return (
    <section className={styles.section}>
      <span className={`${genStyles.midText} ${styles.mark}`}>
        Если Вам не хватает привелегий на сервере, то вы можете помочь нашему
        проекту в развитии взамен на уважение и дополнительные плюшки...
      </span>
      {message && (
        <span
          className={`${genStyles.midText} ${styles.mark} ${
            message.isError && styles.errorMsg
          }`}
        >
          {message.text}
        </span>
      )}
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validate={validator}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={styles.form}>
            <div className={styles.fields}>
              <Field
                as="select"
                id="serverId"
                name="serverId"
                className={`${genStyles.midText} ${styles.field} ${
                  styles.selectField
                } ${formik.errors.serverId ? styles.fieldError : ""}`}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  formik.handleChange(event);
                  formik.setFieldValue("groupName", "", false);
                  setConfirmMsg(undefined);
                }}
              >
                <option value="" disabled>
                  Выберите сервер
                </option>
                {cabinet.serverList.map((server) => {
                  return (
                    <option key={server.server} value={server.permissionName}>
                      {server.server}
                    </option>
                  );
                })}
              </Field>
              {formik.values.serverId && (
                <Field
                  as="select"
                  id="groupName"
                  name="groupName"
                  className={`${genStyles.midText} ${styles.field} ${
                    styles.selectField
                  } ${formik.errors.groupName ? styles.fieldError : ""}`}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    formik.handleChange(event);
                    setConfirmMsg(undefined);
                  }}
                >
                  <option value="" disabled>
                    Выберите статус
                  </option>
                  {cabinet.priceList
                    .filter(
                      (group) => group.serverSuffix === formik.values.serverId
                    )
                    .map((group) => {
                      return (
                        <option key={group.name} value={group.name}>
                          {group.name}
                        </option>
                      );
                    })}
                </Field>
              )}
              {formik.values.groupName && (
                <>
                  <Field
                    id="monthsNum"
                    name="monthsNum"
                    type="number"
                    placeholder="Срок статуса"
                    min={1}
                    className={`${genStyles.midText} ${styles.field} ${
                      formik.errors.monthsNum ? styles.fieldError : ""
                    }`}
                  />
                  <p className={styles.sum}>{getTotalPrice(formik.values)}</p>
                </>
              )}
            </div>
            <ErrorMessage
              name="serverId"
              component="p"
              className={styles.errorMsg}
            />
            <ErrorMessage
              name="groupName"
              component="p"
              className={styles.errorMsg}
            />
            <ErrorMessage
              name="monthsNum"
              component="p"
              className={styles.errorMsg}
            />
            {confirmMsg && formik.isValid && formik.dirty ? (
              <>
                <p className={`${genStyles.midText} ${styles.confirmMsg}`}>
                  {confirmMsg}
                </p>
                <div className={styles.buttons}>
                  <button
                    type="submit"
                    style={{ color: "lime" }}
                    className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                    disabled={!formik.isValid || !formik.dirty || isLoading}
                    onClick={() => formik.setFieldValue("changeGroup", true)}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    style={{ color: "red" }}
                    className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                    disabled={!formik.isValid || !formik.dirty || isLoading}
                    onClick={() => setConfirmMsg(undefined)}
                  >
                    Нет
                  </button>
                </div>
              </>
            ) : (
              <button
                type="submit"
                className={`${genStyles.button} ${genStyles.midText} ${styles.button}`}
                disabled={!formik.isValid || !formik.dirty || isLoading}
              >
                Приобрести
              </button>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default BuyStatusPage;
