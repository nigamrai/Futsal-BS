import { useEffect, useState } from "react";
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

  useEffect(() => {
    let isAuth = localStorage.getItem("isLoggedIn");
    if (isAuth) {
      navigate("/home");
    }
  }, [navigate]);

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
    if (!loginData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      toast.error(
        "Password must have minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      const user = response.payload.user;
      setLoginData({
        email: "",
        password: "",
      });

      // Check user role and navigate accordingly
      if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      toast.error("Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A7116] w-full p-4 flex items-center justify-center">
      <div className="bg-[#F0F2F5] w-full max-w-[800px] lg:max-w-[1450px] h-auto lg:h-[650px] rounded-xl border-8 border-[#50A637] flex flex-col lg:flex-row justify-evenly items-center gap-5 lg:gap-20 px-4 lg:px-20 py-10">
        <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
          <img src={logo} className="w-[150px] lg:w-[200px]" alt="Logo" />
          <h1 className="text-2xl lg:text-4xl text-black font-bold w-full lg:w-[400px]">
            Book Bhatbhateni Futsal
          </h1>
        </div>
        <div>
          <form
            noValidate
            className="bg-[#FEFAFA] w-full max-w-[350px] lg:max-w-[400px] h-auto lg:h-[300px] rounded-md pt-8 flex flex-col items-center gap-6 px-4"
            onSubmit={onLogin}
          >
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <div>
                <input
                  type="email"
                  className="w-[300px] h-[50px] rounded-md px-4 border-2 border-black"
                  name="email"
                  onChange={handleUserInput}
                  placeholder="Email address"
                  value={loginData.email}
                />
              </div>
              <div>
                <input
                  className="w-[300px] h-[50px] rounded-md px-4 border-2 border-black"
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
              className="bg-[#2BA942] w-full rounded-md h-[50px] text-white text-xl lg:text-2xl font-bold"
            >
              Login
            </button>
            <div className="flex flex-col gap-4 items-center w-full px-4">
              <div className="w-full h-[1px] bg-black"></div>
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
