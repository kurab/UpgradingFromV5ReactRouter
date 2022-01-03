import React, { VFC, memo } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavMenu: VFC = memo(() => {
  let location = useLocation();
  return (
    <>
      <p>path: {location.pathname}</p>
      <h2>6 style</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/public">Public</Link>
        </li>
        <li>
          <Link to="/new/6/secret">Secret (not login)</Link>
        </li>
        <li>
          <Link to="/new/6/profile/foobar">Profile6 - id: foobar</Link>
        </li>
        <li>
          <Link to="/new/6/mypage">Mypage</Link>
        </li>
        <li>
          <Link to="/new/6/mypage/bookmarks">Bookmarks</Link>
        </li>
        <li>
          <Link to="/new/6/mypage/settings">Settings</Link>
        </li>
      </ul>
    </>
  );
});
