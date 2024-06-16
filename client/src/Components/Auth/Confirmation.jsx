import { FaEnvelope } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirmation } from "../../redux/slices/authSlices";
function Confirmation() {
    const {token}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    async function handleConfirmation(){
        const response=await dispatch(confirmation(token));
        console.log(response.payload);
        if(response?.payload?.success){
            navigate("/");
        }
    }

  return (
    <div className="h-screen bg-[#0A7116] w-full p-10">
      <div className="bg-[#F0F2F5] w-[1440px] h-[650px] rounded-2xl border-8 border-[#50A637] flex  justify-center items-center">
        <div className="bg-white h-[400px] w-[500px] flex justify-center items-center flex-col p-6 gap-4">
          <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full border-2 border-[#05AB8B]">
            <FaEnvelope size={50} color="#05AB8B" />
          </div>
          <p className="font-bold text-3xl">Check Your Email</p>
          <p className="font-bold text-black text-center ">
            Please check your email to set password. The url is valid only for 5
            minutes.
          </p>
          <p className="text-black font-semibold">
            If you have set your password then click done
          </p>
          <button className="text-white text-xl font-semibold p-1 text-center w-[400px] h-[50px] bg-[#2BA942] mt-[10px]" onClick={handleConfirmation}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
export default Confirmation;
