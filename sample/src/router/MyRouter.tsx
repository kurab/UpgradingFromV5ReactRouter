import { MyPage } from "../components/pages/my/MyPage";
import { Bookmarks } from "../components/pages/my/Bookmarks";
import { Settings } from "../components/pages/my/Settings";

export const MyRouter = [
  //  {
  //    path: "/",
  //    exact: true,
  //    children: <MyPage />,
  //  },
  {
    path: "/bookmarks",
    exact: false,
    children: <Bookmarks />,
  },
  {
    path: "/settings",
    exact: false,
    children: <Settings />,
  },
  {
    path: "/",
    exact: true,
    children: <MyPage />,
  },
];
