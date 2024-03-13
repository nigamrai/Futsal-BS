import { useState } from "react";
import Logo from "../assets/images/Logo.png";
function Signup() {
    const [signupData, setSignupData] = useState({
        fullname:"",
        phoneNumber:"",
        emailAddress:"",
        password:"",
        confirmPassword:"",
    })
    function handleUserInput(e){
        const {name, value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
    function createNewAccount() {
        
    }
  return (
    <div className="h-screen bg-[#0A7116] w-full p-10">
      <div className="bg-[#F0F2F5] w-[1285px] h-[575px] rounded-2xl border-8 border-[#50A637] flex justify-around items-center gap-20">
        <div className="flex flex-col gap-2 ">
          <img src={Logo} className="w-[200px]" />
          <p className="text-3xl w-[250px]">
            <b>Rave Futsal Booking System</b>
          </p>
        </div>
        <form className="bg-[#FEFCFC] h-[450px] w-[440px] rounded-xl" onSubmit={createNewAccount}>
          <div className="flex flex-col items-center gap-2 pt-8">
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="fullname"
                onChange={handleUserInput}
                type="text"
                placeholder="Full name"
                value={signupData.fullname}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="phoneNumber"
                onChange={handleUserInput}
                type="tel"
                placeholder="Phone number"
                value={signupData.phoneNumber}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="emailAddress"
                onChange={handleUserInput}
                type="email"
                placeholder="Email address"
                value={signupData.emailAddress}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px]  border-[1px] border-black rounded p-3"
                name="password"
                onChange={handleUserInput}
                type="text"
                placeholder="Password"
                value={signupData.password}
              />
            </div>
            <div>
              <input
                className="w-[400px] h-[35px] border-[1px] border-black rounded p-3"
                name="confirmPassword"
                onChange={handleUserInput}
                type="text"
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
              <button className="text-[#1877F2] font-bold ml-1">Login</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
