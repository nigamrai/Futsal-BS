import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBooking, deleteBooking } from "../redux/slices/bookingSlice.js";
import { getAllBookings } from "../redux/slices/bookingSlice.js";
import axios from "axios";
import Popupmodel from "./Popupmodel.jsx";
function BookedList({ date, day }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookedData } = useSelector((state) => state?.booking);
  const {data}=useSelector((state)=>state?.auth)
  
  const [bookingData, setBookingData] = useState({
    date: date,
    day: day,
    time: "7am",
    duration: "1",
    phoneNumber: "",
    userId:data._id
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

  // async function getEveryBookings() {
  //   await dispatch(getAllBookings());
  // }
  
 
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
  async function createBooking(e) {
    e.preventDefault();
    if (!bookingData.phoneNumber) {
      toast.error("All fields are required");
      return;
    }
    console.log(bookingData);
    const response = await dispatch(createNewBooking(bookingData));
    console.log(response);
    if (response?.payload?.success) {
      console.log("Hello");
      setBookingData({
        date: date,
        day: day,
        time: "7",
        duration: "1",
        phoneNumber: "",
        userId:data._id
      });
      navigate("/futsaladmin");
    }
  }
  
  function popup(id, date, day, item) {
    // console.log(item)
    return (
      <dialog id={id} className="bg-[#F0F2F5] h-[400px]  ">
        <div className="modal-box h-[400px] w-full  bg-[#F0F2F5] m-0">
          <form method="dialog" className="modal-backdrop ">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black text-xl">
              ✕
            </button>
          </form>

          <form
            noValidate
            className="text-black flex flex-col justify-center items-center font-semibold gap-4"
            onSubmit={createBooking}
          >
            <div>
              <label htmlFor="date" className="font-semibold text-2xl mr-2">
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
            <div>
            </div>
              <div className="text-black">
                  <table className="w-[300px] border-collapse border-black">
                    <thead>
                    <tr className="border-2 border-black">  
                            <th className="border-2 border-black">BookedList</th>  
                            <th className="border-2 border-black">Action</th>  
                        </tr>  
                        </thead>
                           <tbody>
                              {/**/}
                                {bookedData ? (
                            
                                    bookedData
                                    .filter((booking) => booking.date === date && booking.time === item)
                                    .map((booking) => {
                                      console.log(booking);
                                      return  <tr key={booking._id}>
                                            <td className="border-2 border-black">
                                            {/* Display users table's users data or information */}
                                              <p>Name: {booking.userId.fullName} </p>
                                              <p>Time: {booking.time}</p>
                                              <p>Duration: {booking.duration}</p>
                                              <p>PhoneNumber: {booking.phoneNumber}</p>
                                              <p>PaymentMethod: {booking.paymentMethod}</p>
                                              <p>Amount: {booking.amount}</p>
                                             </td>
                                            <td  className="border-2 border-black">
                                            <button className="border-2 border-black" onClick={() => deleteBooking(booking._id)}>Delete</button><br/>
                                              <button  className="border-2 border-black">Edit</button>
                                            </td>
                                        </tr>
                                    })   
                                  ) : (
                                    <></>
                                )} 
                                <>
                                  {/* Rendering "No booking found" text and book button */}
                                  {(!bookedData || !bookedData.find(booking => booking.date === date && booking.time === item)) && (
                                    
              <label htmlFor="date" className="font-semibold text-2xl mr-2">
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
              <div>
                <label htmlFor="duration" className="text-2xl">
                  Duration:
                </label>
                <select
                  id="duration"
                  name="duration"
                  onChange={handleUserInput}
                  value={bookingData.duration}
                  className="w-[80px] bg-white ml-2 border-2 border-black"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
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

            <button
              type="submit"
              name="submit"
              className="bg-[#2BA942] py-3 w-[350px] text-white font-bold mt-8"
              
            >
              Book Now
              </button>
                                  )}
                                </>
                           </tbody>     
                 </table>
              </div>
          </form>
        </div>
      </dialog>
    );
  }

  return (
    <div className="flex mt-[1px] gap-[1px]">
      <div className="w-[227px] bg-black text-white flex flex-col justify-center items-center">
        <p className="font-bold text-2xl">{day}</p>
        <p id="date" className="font-semibold text-xl">
          {date}
        </p>
      </div>
      <div className="grow  grid grid-cols-7 gap-[1px] text-black font-semibold">
        {timeSlot.map((item, key) => {
  
          let bgColor = "bg-white";
          if (bookedDate[date]) {
            // console.log(bookedDate[date]); // Log the array of times for the given date
            // console.log(item); // Log the current item
            bookedDate[date].forEach((element) => {
              // console.log( element)
              // console.log( item)
              if (element == item) {

                bgColor = "bg-[#ff0000]";
   
                return true;
              }
            });
      
            // console.log(value);
          }

          return (
            <Fragment>
              {popup(`bookingForm${day}${key}`, date, day, item)}
              <button
                key={key}
                className={` btn text-black hover:text-white h-[40px] w-[127px] border-2 border-black flex items-center justify-center ${bgColor}`}
                onClick={() =>
                  document.getElementById(`bookingForm${day}${key}`).showModal()
                }
                value={`${date} ${day} ${item}`}
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
