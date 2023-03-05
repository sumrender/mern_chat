import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useRootContext from "../hooks/useRootContext";

const styles = {
  loginContainer: {
    backgroundColor: "pink",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    backgroundColor: "orange",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "300px",
    gap: 10,
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { user } = useRootContext();

  const { loading, error, login } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/chats");
  }, []);

  async function handleLogin() {
    try {
      const { email, password } = formData;
      await login(email, password);
    } catch (err) {
      console.log(err.message);
    }
  }
  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <div className="form">
        <div className="error">{error && <p>error.message</p>}</div>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email address"
          onChange={(e) => handleFormData(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={(e) => handleFormData(e)}
        />
        {loading && <p>Waiting for chocolating...</p>}
        <button disabled={loading} onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
