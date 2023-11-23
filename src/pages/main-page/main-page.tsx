import { FC } from "react";
import Feed from "../../components/feed/feed";
import { Outlet } from "react-router";

const MainPage: FC = () => {
  return (
    <>
      <Feed />
      <Outlet />
    </>
  );
};
export default MainPage;
