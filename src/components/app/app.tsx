import { FC, useEffect } from "react";
import Header from "../header/header";
import Content from "../content/content";
import Footer from "../footer/footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../services/user/actions";
import { AppDispatch } from "../../services/store";
import userSlice from "../../services/user/slices";
import { fetchFeed } from "../../services/feed/actions";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchFeed(1));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
export default App;
