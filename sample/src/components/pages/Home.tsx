import React, { VFC, memo } from "react";
import { NavMenu } from "../organism/NavMenu";

export const Home: VFC = memo(() => {
  return (
    <div className="container">
      <h1>Home!</h1>
      <NavMenu />
    </div>
  );
});
