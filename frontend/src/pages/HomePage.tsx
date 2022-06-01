import { Button } from "antd";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const {user, logOutUser} = useAuthContext();
  return (
    <div>
      {user && <Button onClick={logOutUser}>Log Out</Button>}
      {user && <p> Hello {user?.username}</p>}
      <p>You are logged to the home page</p>
    </div>
  );
};

export default HomePage;