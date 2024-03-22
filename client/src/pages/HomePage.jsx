import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import background from '../assets/images/background.png';
import { futsalDetails } from "../redux/slices/futsalSlice";
function HomePage(){
    const {futsalData}=useSelector((state)=>state?.futsal);
    const dispatch=useDispatch();
    async function getFutsalDetails(){
        await dispatch(futsalDetails());
    }
    useEffect(()=>{
        getFutsalDetails();
    },[])
    
    return <HomeLayout>
        <div style={{
            backgroundImage:`url(${background})`,
            backgroundSize:'cover'
        }} className="h-[400px] px-[100px] flex flex-col justify-center gap-2">
            <h1 className="text-6xl text-[#FFDC58] font-bold w-[700px]">Book {futsalData.map((futsal)=>futsal.futsalName)} </h1>
            <p className="text-white font-bold text-3xl">Booking made easier</p>
        </div>
        <div>
            <p className="text-center text-white text-5xl font-bold mt-[25px]">
                    Details   
            </p>
        </div>
        <div className="mt-[25px] flex justify-center items-center gap-[30px]">
            <div className="bg-[#FFFFFF] w-[620px] ml-[15px] h-[500px] flex-col">
                <p className="text-center text-black text-4xl font-bold p-[35px]">Basic Details:</p>
                <div className="flex gap-[25px] justify-center font-bold">
                    <div className="text-[black]">
                        <p className="underline-offset-1">Location:</p>
                        <p className="underline-offset-2">Price Per Hour:</p>
                        <p className="underline-offset-4">Opening Time:</p>
                        <p className="underline-offset-8">Closing Time:</p>
                        <p className="underline-offset-8">Status:</p>
                    </div>
                    <div className="text-[black]">
                        <p className="underline-offset-1">{futsalData.map((futsal)=>futsal.futsalAddress)}</p>
                        <p className="underline-offset-2">{futsalData.map((futsal)=>futsal.futsalPrice.day)}</p>
                        <p className="underline-offset-4">{futsalData.map((futsal)=>futsal.futsalOpeningTime)}</p>
                        <p className="underline-offset-8">{futsalData.map((futsal)=>futsal.futsalClosingTime)}</p>
                        <p className="underline-offset-8">{futsalData.map((futsal)=>futsal.futsalOpenStatus)}</p>
                    </div>
                 </div>        
            </div>
            <div className="overflow-hidden relative absolute">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.941484331196!2d85.35038037434086!3d27.719092924975328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1962d1d5d6bf%3A0x43fcef9e567f899f!2sBhat-Bhateni%20Super%20Store%20Boudha%20Chuchepati!5e0!3m2!1sen!2snp!4v1711008771566!5m2!1sen!2snp" width="600" height="500" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div className="">
            <p className="text-center text-white text-5xl font-bold mt-[25px]">Booking</p>
        </div>
    </HomeLayout>
}
export default HomePage;