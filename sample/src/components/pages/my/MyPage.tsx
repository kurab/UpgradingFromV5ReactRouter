import React, { VFC, memo } from "react";
import { NavMenu } from "../../organism/NavMenu";

export const MyPage: VFC = memo(() => {
  return (
    <div className="container">
      <h1>My Page!</h1>
      <NavMenu />
    </div>
  );
});
