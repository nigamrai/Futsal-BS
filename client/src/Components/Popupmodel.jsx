import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBooking } from "../redux/slices/bookingSlice.js";
function Popupmodel({ date, day }) {
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
    " "
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
      navigate("/home");
    }
  }
  
  function model(id, date, day, item) {
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
          </form>
        </div>
      </dialog>
    );
  }

  return (
    <div >
      <div>
        <p className="font-bold text-2xl">{day}</p>
        <p id="date" className="font-semibold text-xl">
          {date}
        </p>
      </div>
      <div className="text-black">
        {timeSlot.map((item, key) => {
  
          let bgColor = "bg-white";
          if (bookedDate[date]) {
            // console.log(bookedDate[date]); // Log the array of times for the given date
            // console.log(item); // Log the current item
            
            // console.log(value);
          }

          return (
            <Fragment>
              {model(`bookingForm${day}${key}`, date, day, item)}
              <button
                key={key}
                className={`h-[40px] w-[127px] border-2 border-black flex items-center justify-center ${bgColor}`}
                onClick={() =>
                  document.getElementById(`bookingForm${day}${key}`).showModal()
                }
                value={`${date} ${day} ${item}`}
              >
                Book
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Popupmodel;
