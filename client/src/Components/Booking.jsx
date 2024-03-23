import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBooking } from '../redux/slices/bookingSlice.js';
function Booking({ date, day }) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {bookedData}=useSelector((state)=>state?.booking);
    const [bookingData, setBookingData] = useState({
    date: date,
    day: day,
    time: "7",
    duration: "1",
    phoneNumber: ""
  });
  const timeSlot = [
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];
  console.log(bookedData);
  function handleUserInput(e) {
        const {name,value}=e.target;
        setBookingData({
            ...bookingData,
            [name]:value
        })
        
  }
  async function createBooking(e){
    e.preventDefault();
    if(!bookingData.phoneNumber){
        toast.error("All fields are required");
        return;
    }
    const response=await dispatch(createNewBooking(bookingData));

    if(response?.payload?.success){
        setBookingData({
            date: date,
            day: day,
            time: "7",
            duration: "1",
            phoneNumber: "",
        })
       navigate('http://localhost:5173/home');
        
        

    }
  

  }
  function popup(id, date, day, item) {
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
            <h1 className="text-4xl font-bold">Booking Form</h1>
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
              <label htmlFor="time">Time</label>
              <select
                id="time"
                name="time"
                onChange={handleUserInput}
                value={bookingData.time}
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
              <label htmlFor="duration">Duration</label>
              <select
                id="duration"
                name="duration"
                onChange={handleUserInput}
                value={bookingData.duration}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleUserInput}
                value={bookingData.phoneNumber}
              />
            </div>
            <div>
              <label htmlFor="bookingTime">Booking Time:</label>
              <input type="text" id="bookingTime" name="bookingTime" />
            </div>
            <button type="submit" name="submit">
              Book Now
            </button>
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
          return (
            <Fragment>
              {popup(`bookingForm${day}${key}`, date, day, item)}
              <button
                key={key}
                className="h-[40px] w-[127px] border-2 border-black bg-white flex items-center justify-center"
                onClick={() =>
                  document.getElementById(`bookingForm${day}${key}`).showModal()
                }
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

export default Booking;
