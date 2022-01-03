import React, { VFC, memo } from "react";
import { NavMenu } from "../../organism/NavMenu";

export const Settings: VFC = memo(() => {
  return (
    <div className="container">
      <h1>Settings!</h1>
      <NavMenu />
    </div>
  );
});
