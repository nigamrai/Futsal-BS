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
        fullName:"",
        mobile:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"USER"
    })
    function handleUserInput(e){
        const {name, value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
    async function createNewAccount(event) {
      event.preventDefault();
      
      if(!signupData.fullName || !signupData.mobile || !signupData.email|| !signupData.password || !signupData.confirmPassword || !signupData.role) {
        toast.error("Please fill all the details");
        return;
      }

      if(signupData.fullName.length < 5 || signupData.fullName.length > 50) {
        toast.error("Your name should be atleast less than 50 and greather than 5");
        return;
      }

      if(signupData.mobile.length < 10){
        toast.error("Your Phone Number be less than 10 numbers");
        return;        
      }

      if(!signupData.email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
        toast.error("Invalid email format");
        return;
      }

      if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        toast.error("Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
        return;
      }

      if(signupData.confirmPassword !==signupData.password){
        toast.error("Your confirmPassward does not match with password");
        return;
      }

      // const formData = new FormData();
      // formData.append("fullName", signupData.fullName);
      // formData.append("phoneNumber", signupData.mobile);
      // formData.append("email", signupData.email);
      // formData.append("pasword", signupData.password);
      // formData.append("confirmPassword", signupData.confirmPassword);

      //dispatch create account

      const response = await dispatch(createAccount(signupData));
      if(response?.payload?.success){
    
      navigate("/");

      setSignupData({
        fullName:"",
        mobile:"",
        email:"",
        password:"",
        confirmPassword:"",        
      });
    }
    }

  return (
    <div className="h-screen bg-[#0A7116] w-full p-10">
      <div className="bg-[#F0F2F5] w-[1440px] h-[650px] rounded-2xl border-8 border-[#50A637] flex justify-around items-center gap-20">
        <div className="flex flex-col gap-2 ">
          <img src={Logo} className="w-[200px]" />
          <h1 className="text-4xl text-black font-bold w-[350px] ">
            Bhatbhateni Futsal Booking System
          </h1>
        </div>
        <form className="bg-[#FEFCFC] h-[450px] w-[440px] rounded-xl" onSubmit={createNewAccount}>
          <div className="flex flex-col items-center gap-2 pt-8">
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="fullName"
                onChange={handleUserInput}
                type="text"
                required
                placeholder="Full name"
                value={signupData.fullName}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="mobile"
                onChange={handleUserInput}
                type="text"
                required
                placeholder="Phone number"
                value={signupData.mobile}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="email"
                onChange={handleUserInput}
                type="email"
                required
                placeholder="Email address"
                value={signupData.email}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="password"
                onChange={handleUserInput}
                type="password"
                required
                placeholder="Password"
                value={signupData.password}
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
                value={signupData.confirmPassword}
              />
            </div>
          </div>
          <div className="ml-[20px] mt-[10px]">
            <p>
              {" "}
              Role:
              <select className="bg-[#E1E1E2] ml-[5px]" name="role" onChange={handleUserInput} value={signupData.role} >
                <option value="USER">USER</option>
                <option value="FUTSAL">FUTSAL</option>
                <option value="AADMIN">ADMIN</option>
              </select>
            </p>
            <p className="mt-[10px] w-[400px]">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </p>

            <button className=" text-white text-xl font-semibold p-1 text-center w-[400px] h-[50px] bg-[#2BA942] mt-[10px]" type="submit">
              SignUp
            </button>

            <p className="ml-[80px] mt-[10px]">
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
