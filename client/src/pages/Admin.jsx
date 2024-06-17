import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaUserSecret } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';
import User from './User';
import FutsalAdmin from './FutsalAdmin';

function Admin() {
    const [view, setView] = useState('dashboard'); // 'dashboard', 'user', or 'futsal'
    const { role } = useSelector((state) => state?.auth);

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
        <div className="h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="bg-green-600 text-white w-full md:w-64 flex-shrink-0">
                <div className="p-4 md:p-8">
                    <img src={logo} className="w-24 h-auto mb-4 md:w-36" alt="logo" />
                    <div className="flex items-center mb-8">
                        <FaUser size={40} className="mr-4" />
                        <p className="font-bold text-xl md:text-2xl">Admin Name</p>
                    </div>
                    <div>
                        {/* Navigation buttons */}
                        <div className="mb-8">
                            {role === 'SUPERADMIN' && (
                                <div className="flex items-center cursor-pointer" onClick={handleUserClick}>
                                    <FaUser size={24} className="mr-2" />
                                    <span className="text-lg md:text-xl">User Management</span>
                                </div>
                            )}
                            {(role === 'ADMIN' || role === 'SUPERADMIN') && (
                                <div className="flex items-center cursor-pointer" onClick={handleFutsalClick}>
                                    <FaUserSecret size={24} className="mr-2" />
                                    <span className="text-lg md:text-xl">Futsal Management</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content Area */}
            <div className="w-full flex-1">
                <div className="p-4 md:p-8">
                    {/* Dynamic content based on view state */}
                    {view === 'dashboard' && (
                        <div className='bg-[#65BD4D] h-[300px] w-full rounded-2xl flex justify-center items-center flex-col'>
                            <p className="text-black md:text-4xl font-bold mb-3">Admin Dashboard</p>
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
        </div>
    );
}

export default Admin;
