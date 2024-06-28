import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { setPasswordThunk } from "../redux/slices/authSlices";

function SetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
    token: token,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  async function setPassword(e) {
    e.preventDefault();
    if (
      !passwordData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      toast.error(
        "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    if (passwordData.confirmPassword !== passwordData.password) {
      toast.error("Your confirm password does not match with password");
      return;
    }

    const response = await dispatch(setPasswordThunk(passwordData));
    if (response?.payload?.success) {
      navigate("/");
      setPasswordData({
        password: "",
        confirmPassword: "",
        token: token,
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#0A7116] p-4 flex justify-center items-center">
      <div className="bg-[#F0F2F5] max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] w-full rounded-2xl border-8 border-[#50A637] flex flex-col md:flex-row justify-around items-center gap-10 p-4">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <img src={Logo} className="w-[150px] md:w-[200px]" alt="Logo" />
          <h1 className="text-2xl md:text-4xl text-black font-bold max-w-[350px]">
            Bhatbhateni Futsal Booking System
          </h1>
        </div>
        <form
          className="bg-[#FEFCFC] w-full max-w-[400px] rounded-xl flex flex-col items-center p-6"
          onSubmit={setPassword}
        >
          <div className="w-full mb-2">
            <input
              className="w-full h-[35px] border-[1px] border-black rounded p-3"
              name="password"
              onChange={handleUserInput}
              type="password"
              required
              placeholder="Password"
              value={passwordData.password}
            />
          </div>
          <div className="w-full mb-2">
            <input
              className="w-full h-[35px] border-[1px] border-black rounded p-3"
              name="confirmPassword"
              onChange={handleUserInput}
              type="password"
              required
              placeholder="Confirm password"
              value={passwordData.confirmPassword}
            />
          </div>
          <button
            className="text-white text-xl font-semibold p-1 text-center w-full h-[50px] bg-[#2BA942] mt-4"
            type="submit"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
