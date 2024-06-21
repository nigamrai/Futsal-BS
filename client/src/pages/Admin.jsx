/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaUser, FaUserSecret } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../assets/images/Logo.png';
import { logout } from '../redux/slices/authSlices';
import FutsalAdmin from './FutsalAdmin';
import User from './User';

function Admin() {
    const [view, setView] = useState('dashboard'); // 'dashboard', 'user', or 'futsal'
    const { role } = useSelector((state) => state?.auth);
    const { data } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();

    const handleUserClick = () => {
        setView('user');
    };

    const handleFutsalClick = () => {
        setView('futsal');
    };

    const handleBackToDashboard = () => {
        setView('dashboard');
    };

    async function handleLogout() {
        const response = await dispatch(logout());
        if (response?.payload?.success) {
          navigate("/");
        }
      }

    return (
        <div className="min-h-screen bg-[#FFFFFF] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="bg-[#66CC75] w-full md:w-72 flex-shrink-0 flex flex-col justify-between">
                <div className="p-4 sticky top-0 p-4 bg-[#66CC75]">
                    <img src={logo} className="w-24 h-auto mb-4 mx-auto" alt="logo" />
                    <div className="flex flex-col items-center mb-8">
                        <FaUser size={40} className="text-white mb-2" />
                        <p className="text-white font-bold text-xl">{data.fullName}</p>
                    </div>
                    <div>
                        {/* Navigation buttons */}
                        <div className="space-y-4">
                            {role === 'ADMIN' && (
                                <div className="flex items-center cursor-pointer" onClick={handleUserClick}>
                                    <FaUser size={24} className="text-white mr-2" />
                                    <span className="text-white text-lg">User Management</span>
                                </div>
                            )}
                            {(role === 'ADMIN' || role === 'SUPERADMIN') && (
                                <div className="flex items-center cursor-pointer" onClick={handleFutsalClick}>
                                    <FaUserSecret size={24} className="text-white mr-2" />
                                    <span className="text-white text-lg">Futsal Management</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-4 mt-auto sticky bottom-0 w-full bg-[#66CC75]">
                    <button onClick={handleLogout} className="w-full text-white bg-red-600 py-2 rounded">
                        Logout
                    </button>
                </div>
            </div>
            {/* Main Content Area */}
            <div className="bg-[#F3F2F2] flex-1">
                <div className="p-4">
                    {/* Dynamic content based on view state */}
                    {view === 'dashboard' && (
                        <div className='bg-slate-300 h-[270px] w-full text-black rounded-2xl flex justify-center items-center'>
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">Dashboard</h1>
                        </div>
                    )}
                    {view === 'user' && (
                        <div className=''>
                            <button onClick={handleBackToDashboard} className="h-[50px] w-[200px] bg-white rounded-2xl border-solid border-2 border-green-500 text-blue-400 font-bold text-xl">Back to Dashboard</button>
                            <User />
                        </div>
                    )}
                    {view === 'futsal' && (
                        <div>
                            <button onClick={handleBackToDashboard} className="h-[50px] w-[200px] bg-white rounded-2xl border-solid border-2 border-green-500 text-blue-400 font-bold text-xl">Back to Dashboard</button>
                            <FutsalAdmin />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
