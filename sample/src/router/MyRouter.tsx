import { Bookmarks } from "../components/pages/my/Bookmarks";
import { Settings } from "../components/pages/my/Settings";

export const MyRouter = [
  {
    path: "bookmarks",
    children: <Bookmarks />,
  },
  {
    path: "settings",
    children: <Settings />,
  },
];
