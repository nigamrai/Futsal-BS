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
    </HomeLayout>
}
export default HomePage;