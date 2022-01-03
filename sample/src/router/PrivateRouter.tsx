import { memo, ReactNode, VFC } from "react";
import { Redirect, Route } from "react-router-dom";
//import { useLoginUser } from "../hooks/useLoginUser";

type Props = {
  path: string;
  children: ReactNode;
  loginUser: boolean;
};

export const PrivateRoute: VFC<Props> = memo((props) => {
  const { path, children, loginUser } = props;
  return loginUser ? (
    <Route path={path}>
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
