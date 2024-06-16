import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { setPasswordThunk } from "../redux/slices/authSlices";
function SetPassword() {
  const { token } = useParams();
  console.log(token);
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
      toast.error("Your confirmPassword does not match with password");
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
    <div className="h-screen bg-[#0A7116]  p-10">
      <div className="bg-[#F0F2F5] w-[1440px] h-[650px] rounded-2xl border-8 border-[#50A637] flex justify-around items-center gap-20">
        <div className="flex flex-col gap-2 ">
          <img src={Logo} className="w-[200px]" />
          <h1 className="text-4xl text-black font-bold w-[350px] ">
            Bhatbhateni Futsal Booking System
          </h1>
        </div>
        <form
          className="bg-[#FEFCFC]  w-[440px] rounded-xl flex justify-center flex-col items-center p-6"
          onSubmit={setPassword}
        >
          <div>
            <input
              className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3 mb-2"
              name="password"
              onChange={handleUserInput}
              type="password"
              required
              placeholder="Password"
              value={passwordData.password}
            />
          </div>
          <div>
            <input
              className="w-[400px] h-[35px] border-[1px] border-black rounded p-3"
              name="confirmPassword"
              onChange={handleUserInput}
              type="password"
              required
              placeholder="Confirm password"
              value={passwordData.confirmPassword}
            />
          </div>
          <button
            className=" text-white text-xl font-semibold p-1 text-center w-[400px] h-[50px] bg-[#2BA942] mt-[10px]"
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
