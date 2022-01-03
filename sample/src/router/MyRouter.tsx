import { MyPage } from "../components/pages/my/MyPage";
import { Bookmarks } from "../components/pages/my/Bookmarks";
import { Settings } from "../components/pages/my/Settings";

export const MyRouter = [
  //  {
  //    path: "/",
  //    children: <MyPage />,
  //  },
  {
    path: "/bookmarks",
    children: <Bookmarks />,
  },
  {
    path: "/settings",
    children: <Settings />,
  },
  {
    path: "/",
    children: <MyPage />,
  },
];
