import React, { VFC, memo } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavMenu: VFC = memo(() => {
  let location = useLocation();
  return (
    <>
      <p>path: {location.pathname}</p>
      <h2>5 style</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/public">Public</Link>
        </li>
        <li>
          <Link to="/profile/8888">Profile - id:8888</Link>
        </li>
        <li>
          <Link to="/secret">Secret (login)</Link>
        </li>
        <li>
          <Link to="/mypage">Mypage</Link>
        </li>
        <li>
          <Link to="/mypage/bookmarks">Bookmarks</Link>
        </li>
        <li>
          <Link to="/mypage/settings">Settings</Link>
        </li>
      </ul>
      <h2>5.1 style</h2>
      <ul>
        <li>
          <Link to="/new/5.1/secret">Secret (not login)</Link>
        </li>
        <li>
          <Link to="/new/5.1/profile/foobar">Profile5.1 - id: foobar</Link>
        </li>
        <li>
          <Link to="/new/5.1/mypage">Mypage</Link>
        </li>
        <li>
          <Link to="/new/5.1/mypage/bookmarks">Bookmarks</Link>
        </li>
        <li>
          <Link to="/new/5.1/mypage/settings">Settings</Link>
        </li>
      </ul>
    </>
  );
});
