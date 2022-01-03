import React, { VFC, memo } from "react";
import { NavMenu } from "../organism/NavMenu";

export const Public: VFC = memo(() => {
  return (
    <div className="container">
      <h1>Public</h1>
      <NavMenu />
    </div>
  );
});
