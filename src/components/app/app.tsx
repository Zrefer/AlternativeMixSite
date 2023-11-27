import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AccountPage from "../../pages/account-page/account-page";
import AddFundsPage from "../../pages/account-page/addFunds-page/addFunds-page";
import { AppDispatch } from "../../services/store";
import BuyStatusPage from "../../pages/account-page/buyStatus-page/buyStatus-page";
import CabinetPage from "../../pages/account-page/cabinet-page/cabinet-page";
import Content from "../content/content";
import Feed from "../feed/feed";
import ItemBuyPage from "../../pages/shops-page/itemBuy-page/itemBuy-page";
import LoginMenu from "../login-menu/login-menu";
import MainPage from "../../pages/main-page/main-page";
import NotFound404Page from "../../pages/not-found/not-found-page";
import ProtectedRoute from "../protected-route/protected-route";
import RegisterMenu from "../register-menu/register-menu";
import ServersPage from "../../pages/servers-page/servers-page";
import ShopPage from "../../pages/shops-page/shop-page/shop-page";
import ShopsPage from "../../pages/shops-page/shops-page";
import ShopsSelectPage from "../../pages/shops-page/shops-select-page/shops-select-page";
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
            <Route path="/" element={<Feed />}>
              {!modalBackground && (
                <>
                  <Route
                    path="login"
                    element={<ProtectedRoute not children={<LoginMenu />} />}
                  />
                  <Route
                    path="register"
                    element={<ProtectedRoute not children={<RegisterMenu />} />}
                  />
                </>
              )}
            </Route>
            <Route path="servers" element={<ServersPage />} />
          </Route>
          <Route
            path="shop"
            element={<ProtectedRoute children={<ShopsPage />} />}
          >
            <Route index element={<ShopsSelectPage />} />
            <Route path=":shopId" element={<ShopPage />}>
              <Route path="buy/:itemId" element={<ItemBuyPage />} />
            </Route>
          </Route>
          <Route
            path="account"
            element={<ProtectedRoute children={<AccountPage />} />}
          >
            <Route index element={<CabinetPage />} />
            <Route path="addFunds" element={<AddFundsPage />} />
            <Route path="buyStatus" element={<BuyStatusPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
      {modalBackground && (
        <Routes>
          <Route
            path="login"
            element={<ProtectedRoute not children={<LoginMenu />} />}
          />
          <Route
            path="register"
            element={<ProtectedRoute not children={<RegisterMenu />} />}
          />
        </Routes>
      )}
    </>
  );
};
export default App;
