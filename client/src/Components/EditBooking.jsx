import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axiosInstance from "../Helpers/axiosInstance";
import { getAllBookings } from "../redux/slices/bookingSlice";

const socket = io.connect("http://localhost:5002");

const EditBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookedData } = useSelector((state) => state?.booking);
  const { id } = useParams();
  const [editData, setEditData] = useState({
    time: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const sendBookedData = () => {
    socket.emit("send_booked_data", { bookedData });
  };

  const handleEdit = async (bookingId) => {
    try {
      const res = await axiosInstance.put(`/booking/edit/${bookingId}`, editData);
      if (res?.data?.success) {
        toast.success("Booking edited successfully.");
        await sendBookedData();
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error editing booking:", error);
      toast.error("An error occurred while editing the booking.");
    }
  };

  useEffect(() => {
    socket.on("received_booked_data", async (bookedData) => {
      await dispatch(getAllBookings());
    });
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Edit Booking</h2>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Time:
            <input
              type="text"
              name="time"
              value={editData.time}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <button
          onClick={() => handleEdit(id)}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Edit Booking
        </button>
      </div>
    </div>
  );
};

export default EditBooking;
