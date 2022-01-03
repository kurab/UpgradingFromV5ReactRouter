import React, { VFC, memo } from "react";
import { Link } from "react-router-dom";

export const NotFound: VFC = memo(() => {
  return (
    <div className="container">
      <h1>NotFound</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
});
