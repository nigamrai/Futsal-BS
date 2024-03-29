import { useDispatch, useSelector } from "react-redux";
import { userDetails ,deleteUser} from "../redux/slices/userSlice.js";
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

    const removeUser = async (userId) => {
     const response=await dispatch(deleteUser(userId));
     if(response?.payload?.success){
        getUserDetails();
     }
    };
    
    return (
        <div className="bg-[#D9D9D9] w-full h-auto border-8 border-[#2BA942]">
            <div className=" text-center mt-[30px]">
            <p className="text-[#000000] font-[bold] text-4xl">User-Table</p>
            </div>

            <div className="border-lime-600 text-[#000000] w-[1500px] ml-[245px]">
                <table className="border-collapse border-black ml-[8px]">
                     <thead>  
                        <tr className="border-2 border-black">  
                            <th className="border-2 border-black">S.N</th>  
                            <th className="border-2 border-black">UserName</th> 
                            <th className="border-2 border-black">PhoneNumber</th> 
                            <th className="border-2 border-black">Email</th> 
                            <th className="border-2 border-black">ActiveStatus</th> 
                            <th className="border-2 border-black">Action</th> 
                        </tr>  
                        </thead>  
                        <tbody>   
                        {userData.map((user)=>{

                            return <tr key={user._id}>   
                            <td className="border-2 border-black" >{user._id}</td>
                            <td className="border-2 border-black" >{user.fullName}</td> 
                            <td className="border-2 border-black" >{user.mobile}</td> 
                            <td className="border-2 border-black" >{user.email}</td>
                            <td className="border-2 border-black" >{user.role}</td>  
                            <td className="border-2 border-black grid gap-2 grid-cols">
                            
                            <button className="border-2 border-black" onClick={() => removeUser(user._id)}>Delete</button>
                            <button className="border-2 border-black">edit</button>
                            </td>                   
                            </tr> 
                        })}
                     </tbody>      
                        
                </table>  
            </div>
        </div>
    )

}
export default User;