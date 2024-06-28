import { useDispatch, useSelector } from "react-redux";
import { userDetails} from "../redux/slices/userSlice.js";
import { useEffect } from "react";

function TotalUsers() {

    const {userData}=useSelector((state)=>state?.user);
    const dispatch=useDispatch();
    async function getUserDetails(){
        await dispatch(userDetails());
    }
    useEffect(()=>{
        getUserDetails();
    },[])

    
    return (
        <div className="bg-[#D9D9D9] w-full h-auto border-8 border-[#2BA942]">
            <div className=" text-center mt-[30px]">
            <p className="text-[#000000] font-[bold] text-4xl">TotalUsers</p>
            </div>

            <div className="border-lime-600 text-[#000000] w-[1500px] ml-[245px]">
                <table className="border-collapse border-black ml-[8px]">
                     <thead>  
                        <tr className="border-2 border-black">  
                            <th className="border-2 border-black">S.N</th>  
                            <th className="border-2 border-black">UserName</th> 
                            <th className="border-2 border-black">PhoneNumber</th> 
                            <th className="border-2 border-black">Email</th> 
                        </tr>  
                        </thead>  
                        <tbody>   
                        {userData.map((user, index)=>{

                            return <tr key={index}>   
                            <td className="border-2 border-black" >{index + 1}</td>
                            <td className="border-2 border-black" >{user.fullName}</td> 
                            <td className="border-2 border-black" >{user.mobile}</td> 
                            <td className="border-2 border-black" >{user.email}</td>                    
                            </tr> 
                        })}
                     </tbody>      
                        
                </table>  
            </div>
        </div>
    )

}
export default TotalUsers;