import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import useRootContext from "../hooks/useRootContext";

const DEFAULT_PIC =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useRootContext();
  const { loading, error, register, picUpload } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: DEFAULT_PIC,
  });

  useEffect(() => {
    if (user) navigate("/chats");
  }, []);

  async function handlePic(e) {
    const picUrl = await picUpload(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: picUrl });
  }

  async function handleRegister() {
    console.log(formData);
    const { name, email, password, confirmPassword, pic } = formData;
    await register(name, email, password, confirmPassword, pic);
  }

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <div className="form">
        <div className="error">{error && <p>error.message</p>}</div>
        <h1>Signup</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleFormData(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleFormData(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleFormData(e)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleFormData(e)}
        />
        <input
          type="file"
          accept="image/*"
          name="pic"
          onChange={(e) => handlePic(e)}
        />
        <button disabled={loading} onClick={handleRegister}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
