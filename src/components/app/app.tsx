import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AccountPage from "../../pages/account-page/account-page";
import { AppDispatch } from "../../services/store";
import CabinetPage from "../../pages/account-page/cabinet-page/cabinet-page";
import Content from "../content/content";
import LoginMenu from "../login-menu/login-menu";
import MainPage from "../../pages/main-page/main-page";
import NotFound404Page from "../../pages/not-found/not-found-page";
import ProtectedRoute from "../protected-route/protected-route";
import RegisterMenu from "../register-menu/register-menu";
import { fetchFeed } from "../../services/feed/actions";
import { fetchUser } from "../../services/user/actions";
import { useDispatch } from "react-redux";
import useModalNavigate from "../../hooks/useModalNavigate";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchFeed(1));
  }, [dispatch]);

  const { modalBackground, location } = useModalNavigate();

  return (
    <>
      <Routes location={modalBackground || location}>
        <Route path="/" element={<Content />}>
          <Route path="/" element={<MainPage />}>
            {!modalBackground && (
              <>
                <Route
                  path="/login"
                  element={<ProtectedRoute not children={<LoginMenu />} />}
                />
                <Route
                  path="/register"
                  element={<ProtectedRoute not children={<RegisterMenu />} />}
                />
              </>
            )}
          </Route>
          <Route
            path="/account"
            element={<ProtectedRoute children={<AccountPage />} />}
          >
            <Route index element={<CabinetPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
      {modalBackground && (
        <Routes>
          <Route
            path="/login"
            element={<ProtectedRoute not children={<LoginMenu />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute not children={<RegisterMenu />} />}
          />
        </Routes>
      )}
    </>
  );
};
export default App;
