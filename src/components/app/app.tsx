import { FC, useEffect } from "react";
import Header from "../header/header";
import Content from "../content/content";
import Footer from "../footer/footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../services/user/actions";
import { AppDispatch } from "../../services/store";
import { fetchFeed } from "../../services/feed/actions";
import { Route, Routes } from "react-router-dom";
import LoginMenu from "../login-menu/login-menu";
import RegisterMenu from "../register-menu/register-menu";
import NotFound404Page from "../../pages/not-found/not-found-page";
import useModalNavigate from "../../hooks/useModalNavigate";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchFeed(1));
  }, [dispatch]);

  const { modalBackground } = useModalNavigate();

  return (
    <>
      <Header />
      <Routes location={modalBackground}>
        <Route path="/" element={<Content />}>
          {!modalBackground && (
            <>
              <Route path="login" element={<LoginMenu />} />
              <Route path="register" element={<RegisterMenu />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
      {modalBackground && (
        <Routes>
          <Route path="login" element={<LoginMenu />} />
          <Route path="register" element={<RegisterMenu />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};
export default App;
