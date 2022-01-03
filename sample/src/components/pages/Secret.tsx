import React, { VFC, memo } from "react";
import { NavMenu } from "../organism/NavMenu";

export const Secret: VFC = memo(() => {
  return (
    <div className="container">
      <h1>Secret!</h1>
      <NavMenu />
    </div>
  );
});
