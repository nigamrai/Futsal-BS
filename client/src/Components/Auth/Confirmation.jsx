import { FaEnvelope } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirmation } from "../../redux/slices/authSlices";

function Confirmation() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleConfirmation() {
    const response = await dispatch(confirmation(token));
    console.log(response.payload);
    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A7116] flex justify-center items-center p-4">
      <div className="bg-[#F0F2F5] max-w-[90%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] w-full rounded-2xl border-8 border-[#50A637] flex justify-center items-center p-4">
        <div className="bg-white w-full flex flex-col justify-center items-center p-6 gap-4">
          <div className="flex justify-center items-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full border-2 border-[#05AB8B]">
            <FaEnvelope size={40} color="#05AB8B" className="md:text-[50px]" />
          </div>
          <p className="font-bold text-2xl md:text-3xl">Check Your Email</p>
          <p className="font-bold text-black text-center">
            Please check your email to set password. The url is valid only for 5 minutes.
          </p>
          <p className="text-black font-semibold text-center">
            If you have set your password then click done
          </p>
          <button
            className="text-white text-lg md:text-xl font-semibold py-2 px-4 w-full max-w-[400px] bg-[#2BA942] mt-2"
            onClick={handleConfirmation}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
