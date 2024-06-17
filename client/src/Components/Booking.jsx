import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  createNewBooking,
  getAllBookings,
} from "../redux/slices/bookingSlice.js";

const socket = io.connect("http://localhost:5002");

function Booking({ date, day, getBookings, price }) {
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
  }, []);

  const { data } = useSelector((state) => state?.auth);
  console.log(data);
  const [clicked, setClicked] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: date,
    day: day,
    time: "",
    phoneNumber: data.mobile,
    userId: data._id,
    paymentMethod: "",
    paymentAmount: "",
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
    const recalculatePaymentAmount = () => {
      if (bookingData.paymentMethod === "HALF") {
        setBookingData((prevData) => ({
          ...prevData,
          paymentAmount: calculateHalfTotalAmount(prevData.time),
        }));
      } else if (bookingData.paymentMethod === "FULL") {
        setBookingData((prevData) => ({
          ...prevData,
          paymentAmount: calculateFullTotalAmount(prevData.time),
        }));
      }
    };

    recalculatePaymentAmount();

    const timer = setTimeout(() => {
      recalculatePaymentAmount();
    }, 500);

    return () => clearTimeout(timer);
  }, [bookingData.time, bookingData.paymentMethod]);

  function calculateHalfTotalAmount(time) {
    let pricePerHour = 0;
    if (time === "7am" || time === "8am" || time === "9am") {
      pricePerHour = price.morning / 2;
    } else if (
      time === "4pm" ||
      time === "5pm" ||
      time === "6pm" ||
      time === "7pm" ||
      time === "8pm"
    ) {
      pricePerHour = price.day / 2;
    } else {
      pricePerHour = price.evening / 2;
    }
    return pricePerHour;
  }

  function calculateFullTotalAmount(time) {
    let pricePerHour = 0;
    if (time === "7am" || time === "8am" || time === "9am") {
      pricePerHour = price.morning;
    } else if (
      time === "4pm" ||
      time === "5pm" ||
      time === "6pm" ||
      time === "7pm" ||
      time === "8pm"
    ) {
      pricePerHour = price.day;
    } else {
      pricePerHour = price.evening;
    }
    return pricePerHour;
  }

  async function createBooking(e) {
    e.preventDefault();
    if (!bookingData.paymentMethod || !bookingData.time) {
      toast.error("Time and payment field are required");
      return;
    }

    const response = await dispatch(createNewBooking(bookingData));
    if (response?.payload?.success) {
      await esewaCall(response?.payload?.formData);
      await sendBookedData();
      setBookingData({
        date: date,
        day: day,
        time: "",
        phoneNumber: "",
        userId: data._id,
        paymentAmount: "",
        paymentMethod: "",
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
  }, []);

  function popup(id, date, day, item) {
    return (
      <dialog id={id} className="bg-[#F0F2F5] h-[450px]  ">
        <div className="modal-box h-[450px] w-full  bg-[#F0F2F5] m-0">
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black text-xl">
              ✕
            </button>
          </form>

          <form
            noValidate
            className="text-black flex flex-col  font-semibold gap-4"
            onSubmit={createBooking}
          >
            <h1 className="text-4xl font-bold text-center">Booking Form</h1>
            <div>
              <label htmlFor="date" className="font-semibold text-2xl">
                Date: {day} {date}
              </label>
            </div>
            <div className="flex flex-wrap justify-between w-full gap-2">
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
            </div>
            <div>
              <p>
                *Change the phone number if you are booking for other people
              </p>
              <label htmlFor="phoneNumber" className="text-2xl">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleUserInput}
                value={bookingData.phoneNumber}
                className="w-full md:w-[200px] bg-white ml-2 border-2 border-black h-10 px-4"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="text-2xl">Payment:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                onChange={handleUserInput}
                value={bookingData.paymentMethod}
                className="w-full md:w-[100px] bg-white ml-2 border-2 border-black"
              >
                <option value="">Payment</option>
                <option value="HALF">HALF</option>
                <option value="FULL">FULL</option>
              </select>
            </div>
            <div>
              <label className="text-2xl">Payment Amount:</label>
              <input
                type="text"
                value={bookingData.paymentAmount}
                readOnly
                className="w-full md:w-[200px] bg-[#F0F2F5] outline-none ml-2 h-12 px-4"
              />
            </div>
            <button
              type="submit"
              name="submit"
              className=" bg-[#2BA942] py-3 w-full md:w-[350px] text-white font-bold m-auto "
              onClick={handleClick}
            >
              Pay to Book
            </button>
          </form>
        </div>
      </dialog>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-1 gap-1 w-full">
      <div className="w-full md:w-[272px] bg-black text-white flex flex-col justify-center items-center p-4">
        <p className="font-bold text-xl md:text-2xl">{day}</p>
        <p id="date" className="font-semibold text-lg md:text-xl">
          {date}
        </p>
      </div>
      <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-1 text-black font-semibold w-full">
        {timeSlot.map((item, key) => {
          let bgColor = "bg-white";
          let isDisabled = false;
          if (bookedDate[date]) {
            bookedDate[date].forEach((element) => {
              if (element === item) {
                bgColor = "bg-[#ff0000]";
                isDisabled = true;
                return true;
              }
            });
          }

          return (
            <Fragment key={key}>
              {popup(`bookingForm${day}${key}`, date, day, item)}
              <button
                className={`h-10 w-full border-2 border-black flex items-center justify-center ${bgColor} btn text-black font-bold hover:text-white disabled:bg-[#ff0000] disabled:text-black ${
                  isDisabled ? "cursor-not-allowed" : ""
                }`}
                disabled={isDisabled}
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
