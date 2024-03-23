import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../redux/slices/userSlice";
import { useEffect } from "react";

function User() {

    const {userData}=useSelector((state)=>state?.user);
    const dispatch=useDispatch();
    async function getUserDetails(){
        await dispatch(userDetails());
    }
    useEffect(()=>{
        getUserDetails();
    },[])

    
    return (
        <div className="bg-[#D9D9D9] w-full h-screen border-8 border-[#2BA942]">
            <div className=" text-center mt-[30px]">
            <p className="text-[#000000] font-[bold] text-4xl">User-Table</p>
            </div>

            <div className="bg-white border-lime-600 text-[#000000] w-[700px] ml-[245px]">
                <table className="border-collapse border-black ml-[8px]">  
                    <tr className="border-2 border-black">  
                        <th className="border-2 border-black">S.N</th>  
                        <th className="border-2 border-black">UserName</th> 
                        <th className="border-2 border-black">PhoneNumber</th> 
                        <th className="border-2 border-black">Email</th> 
                        <th className="border-2 border-black">ActiveStatus</th> 
                        <th className="border-2 border-black">Action</th> 
                    </tr>  
                     
                       {userData.map((user,index)=>{

                        return <tr key={index}>   
                        <td className="border-2 border-black" >{index + 1}</td>
                        <td className="border-2 border-black" >{user.fullName}</td> 
                        <td className="border-2 border-black" >{user.mobile}</td> 
                        <td className="border-2 border-black" >{user.email}</td>
                        <td className="border-2 border-black" >{user.role}</td>  
                        <td className="border-2 border-black">
                        <button className="border-2 border-black">Delete</button> <button className="border-2 border-black">edit</button>
                        </td>                   
                        </tr> 
                       })}
                        
                       
                </table>  
            </div>
        </div>
    )

}
export default User;