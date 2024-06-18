import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { createNewBooking, deleteBooking, getAllBookings } from "../redux/slices/bookingSlice.js";

const socket = io.connect("http://localhost:5002");

function BookedList({ date, day }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookedData } = useSelector((state) => state?.booking);
  const { data } = useSelector((state) => state?.auth);

  const sendBookedData = () => {
    socket.emit("send_booked_data", { bookedData });
  };

  useEffect(() => {
    socket.on("received_booked_data", async (bookedData) => {
      await dispatch(getAllBookings());
    });
  }, []);

  const [bookingData, setBookingData] = useState({
    date: date,
    day: day,
    time: "7am",
    duration: "1",
    phoneNumber: "",
    email:"",
    userId: data._id
  });
  const [bookedDate, setBookedDate] = useState([]);
  const timeSlot = [
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
  ];

  useEffect(() => {
    const dateMap = {};
    bookedData.forEach((item) => {
      const { date, time } = item;
      if (!dateMap[date]) {
        dateMap[date] = [time];
      } else {
        dateMap[date].push(time);
      }
    });
    setBookedDate(dateMap);
  }, [bookedData]);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  }

  const handleDelete = async (id) => {
    await dispatch(deleteBooking(id));
    await dispatch(getAllBookings());
    socket.emit("send_booked_data", { bookedData });
  };

  async function createBooking(e) {
    e.preventDefault();
    if (!bookingData.phoneNumber) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(createNewBooking(bookingData));
    if (response?.payload?.success) {
      setBookingData({
        date: date,
        day: day,
        time: "7am",
        duration: "1",
        phoneNumber: "",
        email:"",
        userId: data._id
      });
      await sendBookedData();
      await dispatch(getAllBookings());
    }
  }

  function popup(id, date, day, item) {
    return (
      <dialog id={id} className="bg-[#F0F2F5] rounded-md p-6 w-full max-w-lg mx-auto">
        <form method="dialog" className="relative">
          <button className="absolute top-0 right-0 m-2 text-black text-2xl">&times;</button>
        </form>
        <div className="text-black">
          {bookedData ? (
            bookedData
              .filter((booking) => booking.date === date && booking.time === item)
              .map((booking) => (
                <div key={booking._id} className="mb-4">
                  <h3 className="font-bold text-xl mb-2">Booking Details</h3>
                  <table className="w-full border-collapse border border-black mb-4">
                    <thead>
                      <tr className="border border-black">
                        <th className="border border-black px-2 py-1">Details</th>
                        <th className="border border-black px-2 py-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black px-2 py-1">
                          <p>Date: {booking.date}</p>
                          <p>Name: {booking.userId.fullName}</p>
                          <p>Time: {booking.time}</p>
                          <p>Phone: {booking.phoneNumber}</p>
                          <p>Payment: {booking.paymentMethod}</p>
                          <p>Amount: {booking.amount}</p>
                        </td>
                        <td className="border border-black px-2 py-1">
                          <button className="bg-red-500 text-white px-2 py-1 mr-2" onClick={() => handleDelete(booking._id)}>Delete</button>
                          <button className="bg-blue-500 text-white px-2 py-1" onClick={() => navigate(`/admin/futsaladmin/edit/${booking._id}`)}>Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
          ) : (
            <></>
          )}
          <>
            {/* Rendering "No booking found" text and book button */}
            {(!bookedData ||
              !bookedData.find(
                (booking) => booking.date === date && booking.time === item
              )) && (
              <form
                noValidate
                className="text-black flex flex-col justify-center items-center font-semibold gap-4"
                onSubmit={createBooking}
              >
                <h1 className="text-4xl font-bold">Booking Form</h1>
                <div>
                  <label
                    htmlFor="date"
                    className="font-semibold text-2xl mr-2"
                  >
                    Date: {day}
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    onChange={handleUserInput}
                    value={date}
                    className="bg-[#F0F2F5] outline-none font-semibold text-2xl"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <label htmlFor="time" className="text-2xl">
                      Time:
                    </label>
                    <select
                      id="time"
                      name="time"
                      onChange={handleUserInput}
                      value={bookingData.time}
                      className="w-[80px] bg-white ml-2 border-2 border-black"
                    >
                      {timeSlot.map((time, index) => {
                        return (
                          <option value={time} key={index}>
                            {time}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="text-2xl">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={handleUserInput}
                    value={bookingData.phoneNumber}
                    className="w-[200px] bg-white ml-2 border-2 border-black h-12 px-4"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-2xl">
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleUserInput}
                    value={bookingData.email}
                    className="w-[200px] bg-white ml-2 border-2 border-black h-12 px-4"
                    placeholder="Enter email"
                  />
                </div>

                <button
                  type="submit"
                  name="submit"
                  className="bg-[#2BA942] py-3 w-[350px] text-white font-bold mt-8"
                >
                  Book Now
                </button>
              </form>
            )}
          </>
        </div>
      </dialog>
    );
  }

  return (
    <div className="flex flex-wrap mt-2 gap-2">
      <div className="w-full md:w-1/4 bg-black text-white flex flex-col justify-center items-center py-4">
        <p className="font-bold text-2xl">{day}</p>
        <p id="date" className="font-semibold text-xl">{date}</p>
      </div>
      <div className="w-full md:flex-1 grid grid-cols-2 md:grid-cols-7 gap-2 text-black font-semibold">
        {timeSlot.map((item, key) => {
          let bgColor = "bg-white";
          if (bookedDate[date]?.includes(item)) {
            bgColor = "bg-red-500";
          }
          return (
            <Fragment key={key}>
              {popup(`bookingForm${day}${key}`, date, day, item)}
              <button
                className={`btn text-black hover:text-white h-12 md:h-16 w-full border border-black flex items-center justify-center ${bgColor}`}
                onClick={() => document.getElementById(`bookingForm${day}${key}`).showModal()}
              >
                {item}
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default BookedList;
