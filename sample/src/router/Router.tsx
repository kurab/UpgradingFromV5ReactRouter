import React, { VFC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Public } from "../components/pages/Public";
import { Profile51 } from "../components/pages/Profile51";
import { Secret } from "../components/pages/Secret";
import { NotFound } from "../components/pages/NotFound";
import { MyRouter } from "./MyRouter";
import { PrivateRoute } from "./PrivateRouter";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/public">
        <Public />
      </Route>

      <Route path="/new/5.1/profile/:id" children={<Profile51 />} />

      <Route
        path="/new/5.1/secret"
        component={() => (
          <PrivateRoute path="/new/5.1/secret" loginUser={false}>
            <Secret />
          </PrivateRoute>
        )}
      />

      <Route
        path="/new/5.1/mypage"
        render={({ match: { url } }) => (
          <Switch>
            {MyRouter.map((route) => (
              <Route
                path={`${url}${route.path}`}
                component={() => (
                  <PrivateRoute path={`${url}${route.path}`} loginUser={true}>
                    {route.children}
                  </PrivateRoute>
                )}
              />
            ))}
          </Switch>
        )}
      />

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
});
