import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, userDetails } from "../redux/slices/userSlice.js";

function User() {
    const { userData } = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getUserDetails() {
        await dispatch(userDetails());
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const removeUser = async (userId) => {
        const response = await dispatch(deleteUser(userId));
        if (response?.payload?.success) {
            getUserDetails();
        }
    };

    return (
        <div className="bg-[#D9D9D9] w-full h-auto border-8 border-[#2BA942] p-4 rounded-lg">
            <div className="text-center mt-4 mb-4">
                <p className="text-[#000000] font-bold text-2xl sm:text-4xl">User Table</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-center border-collapse border border-black">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">S.N</th>
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">UserName</th>
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">PhoneNumber</th>
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">Email</th>
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">ActiveStatus</th>
                            <th className="border border-black px-2 py-1 sm:px-4 sm:py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2 text-black">{index + 1}</td>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2 text-black">{user.fullName}</td>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2 text-black">{user.mobile}</td>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2 text-black">{user.email}</td>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2 text-black">{user.role}</td>
                                <td className="border border-black px-2 py-1 sm:px-4 sm:py-2">
                                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                                        <button
                                            className="bg-red-500 text-black px-4 py-1 rounded hover:bg-red-700"
                                            onClick={() => removeUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-500 text-black px-4 py-1 rounded hover:bg-blue-700"
                                            onClick={() => navigate(`/superadmin/user/edit/${user._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default User;
