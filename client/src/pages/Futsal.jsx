import { useDispatch, useSelector } from "react-redux";
import { futsalDetails } from "../redux/slices/futsalSlice";
import { useEffect } from "react";

function Futsal() {
    const {futsalData}=useSelector((state)=>state?.futsal);
    const dispatch=useDispatch();
    async function getFutsalDetails(){
        await dispatch(futsalDetails());
    }
    useEffect(()=>{
        getFutsalDetails();
    },[])
    return (
        <div className="bg-[#D9D9D9] w-full h-screen border-8 border-[#2BA942]">
            <div className=" text-center mt-[30px]">
            <p className="text-[#000000] font-[bold] text-4xl">Futsal-Table</p>
            </div>

            <div className="text-[#000000]w-[1000px] ml-[245px]">
                <table className="border-collapse border  border-black">  
                    <tr className="border-2 border-black">  
                        <th className="border-2 border-black">S.N</th>  
                        <th className="border-2 border-black">FutsalName</th> 
                        <th className="border-2 border-black">PhoneNumber</th> 
                        <th className="border-2 border-black">Email</th> 
                        <th className="border-2 border-black">Addres</th> 
                        <th className="border-2 border-black">Action</th> 
                    </tr>  
                     
                       {futsalData.map((user,index)=>{

                        return <tr key={index}>   
                        <td className="border-2 border-black" >{index + 1}</td>
                        <td className="border-2 border-black" >{futsal.fullName}</td> 
                        <td className="border-2 border-black" >{futsal.futsalPhoneNumber}</td> 
                        <td className="border-2 border-black" >{futsal.futsalAddress}</td>
                        <td className="border-2 border-black" >{futsal.futsalEmail}</td>
                        <td className="border-2 border-black" >{futsal.futsalPrice}</td>  
                        <td className="border-2 border-black">
                        <button>Delete</button> <button className="border-2 border-black">edit</button>
                        </td>                   
                        </tr> 
                       })}
                        
                       
                </table>  
            </div>
        </div>
    );
}
export default Futsal;