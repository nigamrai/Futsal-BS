import { FaUser, FaUserSecret, FaUsers, FaSquareCheck} from 'react-icons/fa6';
import logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';
function Admin(){
    return (
        <div className="h-screen bg-[#FFFFFF] w-full flex">
            <div className="bg-[#66CC75] w-[300px] h-full">
                <div className="p-[30px] ml-[37px]">
                <img src={logo} className='w-[150px] h-[60px]' alt="logo"/>
                </div>
                <div className='ml-[65px]'>
                <FaUser size={50} className='text-white w-[150px] h-[100px]'/>
                <p className='text-[#FFFFFF] font-bold text-2xl Inika'>Admin Name</p>
                </div>

                <div className='text-white font-bold h-[220px] p-[50px]'>
                    <div className='flex gap-[80px] mt-[120px]'>
                        <FaUser size={50} className='text-white'/>
                        <Link to="/user" className='text-white text-3xl'>User</Link>
                    </div>
                    <div className='flex gap-[80px] mt-[120px]'>
                        <FaUserSecret size={50} className='text-white'/>
                       <Link to="/futsal" className='text-white text-3xl'>Futsal</Link>
                    </div>
                </div>
            </div>
            <div className='bg-[#F3F2F2] h-[200px] w-full flex'>
                <div className='bg-[#43BF7F] w-[340px] h-[220px] rounded-[10px] ml-[120px] mt-[180px]'>
                    <div className='font-bold text-center mt-[40px]'>
                    <Link to="" className='text-white text-3xl'>Total User</Link>
                    <FaUsers size={50} className='text-white ml-[135px] mt-[]'/>                    
                    </div>
                               
                </div>
                <div className='bg-[#43BF7F] w-[340px] h-[220px] rounded-[10px] ml-[120px] mt-[180px]'>
                <div className='font-bold text-center mt-[40px]'>
                    <Link to="" className='text-white text-3xl'>Active User</Link>
                    <FaSquareCheck size={50} className='text-white ml-[135px] mt-[]'/>                    
                    </div>
                            
                  </div>
                
            </div>
        </div>
    );
}
export default Admin;