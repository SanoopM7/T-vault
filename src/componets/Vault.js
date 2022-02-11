import React from "react";
import { useParams } from "react-router-dom";
const User = () => {
  const { userName } = useParams();
  return <div>Username: {userName}</div>;
};
export default User;
