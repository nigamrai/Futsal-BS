import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { editUser } from "../redux/slices/userSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    userId: "",
  });

  useEffect(() => {
    // Set initial form data from Redux state (user data)
    setFormData({
      fullName: data.fullName,
      mobile: data.mobile,
      userId: data._id,
    });
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(editUser(formData));
    if (response?.payload?.success) {
      navigate("/me");
      setFormData({
        fullName: "",
        mobile: "",
        userId: ""
      });
    }
  };

  return (
    <HomeLayout>
      <div className="container mx-auto px-4 py-[56px]">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-600">
                Phone Number:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
