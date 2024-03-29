import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { login } from "../redux/slices/authSlices";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }
  async function onLogin(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required");
      return;
    }
    if (!loginData.email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
      toast.error("Invalid email format");
      return;
    }
    if (
      !loginData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      toast.error(
        "Password must have minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      setLoginData({
        email: "",
        password: "",
      });
      navigate("/home");
    }
  }
  return (
    <div className="h-screen bg-[#0A7116] w-full p-12">
      <div className="bg-[#F0F2F5] w-[1450px] h-[650px] rounded-xl border-8 border-[#50A637] flex justify-evenly items-center gap-20 px-20">
        <div className="flex flex-col gap-2 ">
          <img src={logo} className="w-[200px]" />
          <h1 className="text-4xl text-black font-bold w-[400px] ">
            Bhatbhateni Futsal Booking System
          </h1>
        </div>
        <div>
          <form
          noValidate
            className="bg-[#FEFAFA]  w-[400px] h-[300px] rounded-md pt-8 flex flex-col items-center gap-6"
            onSubmit={onLogin}
          >
            <div className="flex flex-col justify-center items-center gap-2 ">
              <div>
                <input
                  type="email"
                  className="w-[350px] h-[50px] rounded-md px-4 border-2 border-black"
                  name="email"
                  onChange={handleUserInput}
                  placeholder="Email address"
                  value={loginData.email}
                />
              </div>
              <div>
                <input
                  className="w-[350px] h-[50px] rounded-md px-4 border-2 border-black"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleUserInput}
                  value={loginData.password}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#2BA942] w-[350px] rounded-md h-[50px] text-white text-2xl font-bold"
            >
              Login
            </button>
            <div className="flex flex-col gap-4 items-center">
              <div className="w-[350px] h-[1px] bg-black"></div>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#1877F2] font-bold">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
