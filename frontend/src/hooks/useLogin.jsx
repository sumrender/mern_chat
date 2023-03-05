import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRootContext from "./useRootContext";

export default function useLogin() {
  const navigate = useNavigate();
  const { ENV_VARIABLES } = useRootContext();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const login = async (email, password) => {
    setLoading(true);

    if (!email || !password) {
      setError({
        show: true,
        severity: "error",
        message: "Details not filled properly",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        ENV_VARIABLES.serverUrl + "/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log("Login Successful", data);

      setLoading(false);
      if (!response.ok)
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      else {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      }
    } catch (err) {
      console.log(err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };

  return { loading, error, login };
}
