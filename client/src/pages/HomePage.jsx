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
        <div className="mt-[25px]">
            <div className="bg-[#FFFFFF] w-[600px] ml-[15px] h-[500px] flex-col">
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
                        <p className="underline-offset-1">Kapan</p>
                        <p className="underline-offset-2">Rs.1200</p>
                        <p className="underline-offset-4">{futsalData.map((futsal)=>futsal.futsalOpeningTime)}</p>
                        <p className="underline-offset-8">9 pm</p>
                        <p className="underline-offset-8">Open</p>
                    </div>
                 </div>        
            </div>
        </div>
    </HomeLayout>
}
export default HomePage;