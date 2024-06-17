import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function Profile() {
  const { data } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch user information here (replace with actual API call)
    // For demonstration, set user information from auth state
    setUserInfo(data);
  }, [data]);

  const handleEditProfile = () => {
    // Handle edit profile logic here (navigate to edit profile page, etc.)
    navigate("/me/edit");
  };

  return (
    <HomeLayout>
      <div className="container mx-auto px-4 py-[56px]">
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
          <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-start mb-4">
              <label className="text-gray-600 font-bold">Name:</label>
              <span className="text-gray-800">{userInfo.fullName}</span>
            </div>
            <div className="flex flex-col items-start mb-4">
              <label className="text-gray-600 font-bold">Email:</label>
              <span className="text-gray-800">{userInfo.email}</span>
            </div>
            <div className="flex flex-col items-start mb-4">
              <label className="text-gray-600 font-bold">Phone:</label>
              <span className="text-gray-800">{userInfo.mobile}</span>
            </div>
            {/* Add more fields as needed */}
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={handleEditProfile}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
