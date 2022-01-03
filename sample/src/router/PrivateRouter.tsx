import { memo, ReactNode, VFC } from "react";
import { Navigate } from "react-router-dom";
//import { useLoginUser } from "../hooks/useLoginUser";

type Props = {
  children: ReactNode;
  loginUser: boolean;
};

export const PrivateRoute: VFC<Props> = memo((props) => {
  const { children, loginUser } = props;
  return loginUser ? (
    <>
      {children}
      <div className="notice">
        <i>you're in a private route.</i>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
});
