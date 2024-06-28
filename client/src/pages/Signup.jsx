import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { createAccount } from "../redux/slices/authSlices";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    status: false,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (!signupData.fullName || !signupData.mobile || !signupData.email) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 5 || signupData.fullName.length > 50) {
      toast.error("Your name should be at least 5 characters and less than 50 characters");
      return;
    }

    if (signupData.mobile.length < 10) {
      toast.error("Your phone number should be 10 digits");
      return;
    }

    if (!signupData.email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
      toast.error("Invalid email format");
      return;
    }

    const response = await dispatch(createAccount(signupData));
    if (response?.payload?.success) {
      console.log(response.payload);
      const token = response.payload.user.setPasswordToken;
      navigate(`/confirmation/${token}`);

      setSignupData({
        fullName: "",
        mobile: "",
        email: "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#0A7116] w-full p-5 flex items-center justify-center">
      <div className="bg-[#F0F2F5] w-full max-w-[1440px] h-auto md:h-[650px] rounded-2xl border-8 border-[#50A637] flex flex-col md:flex-row justify-around items-center gap-5 md:gap-20 p-5 md:p-0">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <img src={Logo} className="w-[150px] md:w-[200px]" alt="Logo" />
          <h1 className="text-3xl md:text-4xl text-black font-bold text-center md:text-left w-full md:w-[350px]">
            Book Bhatbhateni Futsal
          </h1>
        </div>
        <form className="bg-[#FEFCFC] h-auto md:h-[450px] w-full md:w-[440px] rounded-xl p-5" onSubmit={createNewAccount}>
          <div className="flex flex-col items-center gap-4">
            <input
              className="w-full h-[35px] border-[1px] border-black rounded p-3"
              name="fullName"
              onChange={handleUserInput}
              type="text"
              required
              placeholder="Full name"
              value={signupData.fullName}
            />
            <input
              className="w-full h-[35px] border-[1px] border-black rounded p-3"
              name="mobile"
              onChange={handleUserInput}
              type="text"
              required
              placeholder="Phone number"
              value={signupData.mobile}
            />
            <input
              className="w-full h-[35px] border-[1px] border-black rounded p-3"
              name="email"
              onChange={handleUserInput}
              type="email"
              required
              placeholder="Email address"
              value={signupData.email}
            />
          </div>
          <div className="mt-4">
            <p className="mt-4">
              By clicking Sign Up, you agree to our Terms, Privacy Policy, and Cookies Policy.
            </p>
            <button className="mt-4 w-full h-[50px] bg-[#2BA942] text-white text-xl font-semibold rounded" type="submit">
              Sign Up
            </button>
            <p className="mt-4 text-center">
              Already have an account?
              <Link to="/" className="text-[#1877F2] font-bold ml-1">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
