import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import {
  createNewBooking,
  getAllBookings,
} from "../redux/slices/bookingSlice.js";

const socket = io.connect("http://localhost:5002");

function Booking({ date, day, getBookings,price }) {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookedData } = useSelector((state) => state?.booking);
  
  const sendBookedData = () => {
    socket.emit("send_booked_data", { bookedData });
  };
  async function getEveryBookings() {
    await dispatch(getAllBookings());
  }

  useEffect(() => {
    socket.on("received_booked_data", (bookedData) => {
      
      getEveryBookings();
    });
  }, [socket]);
  const { data } = useSelector((state) => state?.auth);
  const [clicked, setClicked] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: date,
    day: day,
    time: "",
    duration: "",
    phoneNumber: "",
    userId: data._id,
    paymentMethod:"",
    paymentAmount:""
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
  const handleClick = () => {
    setClicked(true);
  };
  useEffect(() => {
    getEveryBookings();
   
    setClicked(false);
  }, [clicked]);

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
      userId: data._id,
    });
   
    }
    useEffect(() => {
      // Define a function to recalculate the payment amount
      const recalculatePaymentAmount = () => {
        if (bookingData.paymentMethod === 'HALF') {
          setBookingData(prevData => ({
            ...prevData,
            paymentAmount: calculateHalfTotalAmount(prevData.time, prevData.duration)
          }));
        } else if (bookingData.paymentMethod === 'FULL') {
          setBookingData(prevData => ({
            ...prevData,
            paymentAmount: calculateFullTotalAmount(prevData.time, prevData.duration)
          }));
        }
      };
  
      // Call the function to initially calculate the payment amount
      recalculatePaymentAmount();
  
      // Watch for changes in bookingData and recalculate payment amount when necessary
      const timer = setTimeout(() => {
        recalculatePaymentAmount();
      }, 500); // Debounce the calculation to avoid frequent updates
  
      // Clean up the timer to avoid memory leaks
      return () => clearTimeout(timer);
    }, [bookingData.time, bookingData.duration, bookingData.paymentMethod]); // Watch for changes in time, duration, and payment method
  
  
      // Assuming the full total amount needs to be paid
      // You need to replace 'totalAmount' with your actual total amount calculation
      function calculateHalfTotalAmount(time, duration) {
        let pricePerHour = 0;
        if (time === '7am' || time === '8am' || time === '9am') {
          pricePerHour = price.morning / 2;
        } else if (time === '4pm' || time === '5pm' || time === '6pm' || time === '7pm' || time === '8pm') {
          pricePerHour = price.day / 2;
        } else {
          pricePerHour = price.evening / 2;
        }
        return pricePerHour * duration;
      }
      
      function calculateFullTotalAmount(time, duration) {
        let pricePerHour = 0;
        if (time === '7am' || time === '8am' || time === '9am') {
          pricePerHour = price.morning;
        } else if (time === '4pm' || time === '5pm' || time === '6pm' || time === '7pm' || time === '8pm') {
          pricePerHour = price.day;
        } else {
          pricePerHour = price.evening;
        }
        return pricePerHour * duration;
      }
      
    
 
  

  async function createBooking(e) {
    e.preventDefault();
    if (!bookingData.phoneNumber) {
      toast.error("All fields are required");
      return;
    }
    console.log(bookingData);
      const response = await dispatch(createNewBooking(bookingData));
       
      if (response?.payload?.success) {
       
        await esewaCall(response?.payload?.formData);
        await sendBookedData();
     
        setBookingData({
          date: date,
          day: day,
          time: "",
          duration: "",
          phoneNumber: "",
          userId: data._id,
          paymentAmount:"",
          paymentMethod:""
        });
        
        
        
      
    }
    
  }
  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    socket.on("receive_booked_data", (bookedData) => {
      console.log(bookedData);
    });
  }, [socket]);
  

  function popup(id, date, day, item,totalPayment) {

    
    return (
      <dialog id={id} className="bg-[#F0F2F5] h-[450px]  ">
        <div className="modal-box h-[450px] w-full  bg-[#F0F2F5] m-0">
          <form method="dialog" className="modal-backdrop">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black text-xl">
              ✕
            </button>
          </form>

          <form
            noValidate
            className="text-black flex flex-col  items-center font-semibold gap-4"
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
                  <option value="">Time</option>
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
                  className="w-[100px] bg-white ml-2 border-2 border-black"
                >
                  <option val="">Duration</option>
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
            <div>
              <label className="text-2xl">Payment:</label>
              <select id="paymentMethod" name="paymentMethod" onChange={handleUserInput} value={bookingData.paymentMethod} className="w-[100px] bg-white ml-2 border-2 border-black">
                <option value="">Payment</option>
                <option value="HALF">HALF</option>
                <option value="FULL">FULL</option>
              </select>
            </div>
            <div>
              <label className="text-2xl">Payment Amount:</label>
              <input type="text" value={bookingData.paymentAmount} readOnly className="w-[200px] bg-[#F0F2F5] outline-none ml-2 h-12 px-4"/>
            </div>
            {/* <div class="modal-action"> */}
            {/* <form className="closeButton"> */}
            <button
              type="submit"
              name="submit"
              className=" bg-[#2BA942] py-3 w-[350px] text-white font-bold mt-8 "
              onClick={handleClick}
            >
              Pay to Book
            </button>
            {/* </form> */}
            {/* </div>   */}
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
          let isDisabled = false;
          if (bookedDate[date]) {
            // console.log(bookedDate[date]); // Log the array of times for the given date
            // console.log(item); // Log the current item
            bookedDate[date].forEach((element) => {
              // console.log( element)
              // console.log( item)
              if (element == item) {
                bgColor = "bg-[#ff0000]";
                isDisabled = true;

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
                className={`h-[40px] w-[127px] border-2 border-black flex items-center justify-center ${bgColor} btn text-black font-bold hover:text-white disabled:bg-[#ff0000] disabled:text-black ${
                  isDisabled ? "cursor-not-allowed" : ""
                }`}
                disabled={isDisabled}
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

export default Booking;
