import React, { VFC, memo } from "react";
import { NavMenu } from "../../organism/NavMenu";

export const Bookmarks: VFC = memo(() => {
  return (
    <div className="container">
      <h1>Bookmarks!</h1>
      <NavMenu />
    </div>
  );
});
