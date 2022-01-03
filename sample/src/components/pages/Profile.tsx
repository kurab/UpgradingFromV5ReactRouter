import React, { VFC, memo } from "react";
import { NavMenu } from "../organism/NavMenu";

type Props = { id: string };

export const Profile: VFC<Props> = memo((props) => {
  const { id } = props;
  return (
    <div className="container">
      <h1>Profile: {id}</h1>
      <NavMenu />
    </div>
  );
});
