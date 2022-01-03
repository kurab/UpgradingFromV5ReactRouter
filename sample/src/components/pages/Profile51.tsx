import React, { VFC, memo } from "react";
import { useParams } from "react-router-dom";
import { NavMenu } from "../organism/NavMenu";

type Props = { id: string };

export const Profile51: VFC = memo(() => {
  let { id } = useParams<Props>();
  return (
    <div className="container">
      <h1>Profile5.1: {id}</h1>
      <NavMenu />
    </div>
  );
});
