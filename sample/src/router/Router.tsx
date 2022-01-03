import React, { VFC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Public } from "../components/pages/Public";
import { Profile51 } from "../components/pages/Profile51";
import { Secret } from "../components/pages/Secret";
import { MyPage } from "../components/pages/my/MyPage";
import { NotFound } from "../components/pages/NotFound";
import { MyRouter } from "./MyRouter";
import { PrivateRoute } from "./PrivateRouter";

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="public" element={<Public />} />

      <Route path="new/6/profile/:id" element={<Profile51 />} />

      <Route
        path="new/6/secret"
        element={<PrivateRoute loginUser={false} children={<Secret />} />}
      />
      <Route
        path="new/6/mypage"
        element={<PrivateRoute loginUser={true} children={<MyPage />} />}
      >
        {MyRouter.map((route) => (
          <Route
            path={route.path}
            element={
              <PrivateRoute loginUser={true} children={route.children} />
            }
          />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});
