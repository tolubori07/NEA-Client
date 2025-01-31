// src/pages/Auth/Dlogin.jsx
import { Eye, EyeOff } from "lucide-react";
import { lazy, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authservice";
import { AuthContext } from "../../api/Authcontext";

const Input = lazy(() => import("../../components/Input"));
const Header = lazy(() => import("../../components/DonorHeader"));
const Button = lazy(() => import("../../components/Button"));

const Dlogin = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const showPassword = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userData = { email, password };
      const response = await login(userData);
      setUser(response);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <h1 className="text-text text-3xl font-heading font-body mb-12">
        Enter your login detail
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form className="flex flex-col w-full gap-12" onSubmit={onSubmit}>
        <div className="flex justify-center">
          <Input
            placeholder={"Email"}
            name={"email"}
            type={"email"}
            value={email}
            className="w-[54%] font-bold text-xl"
            onChange={onChange}
          />
        </div>

        <div className="flex justify-center">
          <Input
            placeholder={"Password"}
            name={"password"}
            type={visible ? "text" : "password"}
            value={password}
            className={"w-[50%] font-bold text-xl"}
            onChange={onChange}
          />
          <Button onClick={showPassword} className={"transition-all"}>
            {visible ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        <div className="flex justify-center text-center">
          <Button
            type="submit"
            disabled={isLoading}
            className={"text-white font-bold font-body text-xl px-32"}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Dlogin;
