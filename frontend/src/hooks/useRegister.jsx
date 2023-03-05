import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRootContext from "./useRootContext";

export default function useRegister() {
  const navigate = useNavigate();
  const { ENV_VARIABLES } = useRootContext();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  async function picUpload(pic) {
    setLoading(true);
    if (
      pic === undefined ||
      (pic.type !== "image/jpeg" && pic.type !== "image/png")
    ) {
      setError({
        show: true,
        severity: "warning",
        message: "Please Select an Image!",
      });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "sammyoncloud");
    fetch(ENV_VARIABLES.imgUploadUrl, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const picUrl = data.url.toString();
        console.log("🚀 ~ file: useRegister.jsx:39 ~ .then ~ picUrl", picUrl);

        setLoading(false);
        return picUrl;
      })
      .catch((err) => {
        setLoading(false);
        setError({
          show: true,
          severity: "error",
          message: err.message,
        });
      });
  }

  async function register(name, email, password, confirmPassword, pic) {
    setLoading(true);
    // console.log(name, email, password, confirmPassword, pic);

    if (!name || !email || !password || !confirmPassword) {
      setError({
        show: true,
        severity: "error",
        message: "Details not filled properly",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError({
        show: true,
        severity: "error",
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        ENV_VARIABLES.serverUrl + "/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, pic }),
        }
      );
      const data = await response.json();
      console.log(data);

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
  }

  return { picUpload, register, loading, error };
}
