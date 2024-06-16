import { FaUser, FaUserSecret, FaUsers, FaSquareCheck} from 'react-icons/fa6';
import logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';
import FutsalAdmin from './FutsalAdmin';
import User from './User';
import { useState } from 'react';
// eslint-disable-next-line react/prop-types
function Admin({ allowedRoles }){

    const [view, setView] = useState('dashboard'); // 'dashboard', 'user', or 'futsal'
    const handleUserClick = () => {
        setView('user');
      };
    
      const handleFutsalClick = () => {
        setView('futsal');
      };
    
      const handleBackToDashboard = () => {
        setView('dashboard');
      };
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
                        <button onClick={handleUserClick} className='text-white text-3xl'>User</button>
                    </div>
   
                    <div className='flex gap-[80px] mt-[120px]'>
                       <FaUserSecret size={50} className='text-white' />
                       <button onClick={handleFutsalClick} className='text-white text-3xl'>Futsal</button>
                    </div> 
                                 
                </div>
            </div>
            <div className='bg-[#F3F2F2] h-[200px] w-full flex'>
            {view === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            {/* Dashboard content here */}
          </div>
        )}
        {view === 'user' && ( 
          <div>
            <button onClick={handleBackToDashboard} className="mb-4 text-blue-500">Back to Dashboard</button>
            <User />
          </div>
        )}
        {view === 'futsal' && (
          <div>
            <button onClick={handleBackToDashboard} className="mb-4 text-blue-500">Back to Dashboard</button>
            <FutsalAdmin />
          </div>
        )}
            </div>
        </div>
    );
}
export default Admin;
