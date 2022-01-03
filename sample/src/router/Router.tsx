import React, { VFC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Public } from "../components/pages/Public";
import { Profile } from "../components/pages/Profile";
import { Profile51 } from "../components/pages/Profile51";
import { Secret } from "../components/pages/Secret";
import { NotFound } from "../components/pages/NotFound";
import { MyRouter } from "./MyRouter";
import { PrivateRoute } from "./PrivateRouter";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      {/* 5 style */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/public">
        <Public />
      </Route>
      <Route
        path="/profile/:id"
        render={({ match }) => <Profile id={match.params.id} />}
      />
      <PrivateRoute exact={false} path="/secret" loginUser={true}>
        <Secret />
      </PrivateRoute>

      <Route
        path="/mypage"
        render={({ match: { url } }) => (
          <Switch>
            {MyRouter.map((route) => (
              <PrivateRoute
                exact={route.exact}
                path={`${url}${route.path}`}
                loginUser={true}
              >
                {route.children}
              </PrivateRoute>
            ))}
          </Switch>
        )}
      />

      {/* 5.1 style */}
      <Route path="/new/5.1/profile/:id" children={<Profile51 />} />

      <Route
        path="/new/5.1/secret"
        component={() => (
          <PrivateRoute exact={false} path="/new/5.1/secret" loginUser={false}>
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
                  <PrivateRoute
                    exact={route.exact}
                    path={`${url}${route.path}`}
                    loginUser={true}
                  >
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
