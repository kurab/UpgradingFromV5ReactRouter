import { memo, ReactNode, VFC } from "react";
import { Redirect, Route } from "react-router-dom";
//import { useLoginUser } from "../hooks/useLoginUser";

type Props = {
  exact: boolean;
  path: string;
  children: ReactNode;
  loginUser: boolean;
};

export const PrivateRoute: VFC<Props> = memo((props) => {
  const { exact, path, children, loginUser } = props;
  return loginUser ? (
    <Route exact={exact} path={path}>
      {children}
      <div className="notice">
        <i>you're in a private route.</i>
      </div>
    </Route>
  ) : (
    //<Redirect to="/" />
    <Route path={path} render={() => <Redirect to="/" />} />
  );
});
