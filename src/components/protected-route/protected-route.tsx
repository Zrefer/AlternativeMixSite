import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { RootState } from "../../services/store";
import { Status } from "../../types/general";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  not?: boolean;
  children?: ReactNode;
}

const userStoreSelector = (store: RootState) => {
  return store.userStore;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  not: reverse = false,
  children,
}) => {
  const location = useLocation();

  const { user, authStatus } = useSelector(userStoreSelector);
  switch (authStatus) {
    case Status.Idle:
    case Status.Loading:
      return;
  }

  return (user !== null) !== reverse ? (
    children
  ) : (
    <Navigate
      to={
        reverse
          ? location.state?.referrer ?? "/"
          : {
              pathname: "/login",
              state: { referrer: location },
            }
      }
    />
  );
};
export default ProtectedRoute;
