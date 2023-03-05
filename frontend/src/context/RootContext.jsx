import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ENV_VARIABLES = {
  serverUrl: "http://localhost:5000",
  imgUploadUrl: "https://api.cloudinary.com/v1_1/sammyoncloud/image/upload",
  socketUrl: "http://localhost:8800",
};

export const RootContext = createContext();

const RootContextProvider = function ({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const values = { user, setUser };

  const value = {
    ENV_VARIABLES,
    user,
    setUser,
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (userInfo) navigate("/chats");
  }, [navigate]);

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export default RootContextProvider;
