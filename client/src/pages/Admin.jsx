/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaUser, FaUserSecret } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
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
        <div className="min-h-screen bg-[#FFFFFF] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="bg-[#66CC75] w-full md:w-72 flex-shrink-0">
                <div className="p-4">
                    <img src={logo} className="w-24 h-auto mb-4 mx-auto" alt="logo" />
                    <div className="flex flex-col items-center mb-8">
                        <FaUser size={40} className="text-white mb-2" />
                        <p className="text-white font-bold text-xl">Admin Name</p>
                    </div>
                    <div>
                        {/* Navigation buttons */}
                        <div className="space-y-4">
                            {role === 'SUPERADMIN' && (
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
            </div>
            {/* Main Content Area */}
            <div className="bg-[#F3F2F2] flex-1">
                <div className="p-4">
                    {/* Dynamic content based on view state */}
                    {view === 'dashboard' && (
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Dashboard</h1>
                            <p className="text-base md:text-lg">Welcome to the Admin Dashboard.</p>
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
