import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Booking from "../Components/Booking";
import HomeLayout from "../Layouts/HomeLayout";
import background from "../assets/images/background.png";
import { getAllBookings } from "../redux/slices/bookingSlice";
import { futsalDetails } from "../redux/slices/futsalSlice";
function HomePage() {
  const { isMount } = useSelector((state) => state?.booking);

  const [selectedDate, setSelectedDate] = useState(new Date());
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { futsalData } = useSelector((state) => state?.futsal);
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();
  async function getFutsalDetails() {
    await dispatch(futsalDetails());
  }
  async function getEveryBookings() {
    await dispatch(getAllBookings());
  }
  // function updateMount(){
  //   console.log("hello");
  //   setIsMount(!isMount);

  // }

  const getDates = () => {
    let currentDate = new Date();
    let datesArray = [];

    for (let i = 1; i <= 7; i++) {
      // console.log(currentDate);
      let formattedDate = currentDate.toISOString().slice(0, 10);
      datesArray.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDates(datesArray);
  };

  useEffect(() => {
    getFutsalDetails();
    getEveryBookings();
    getDates();
  }, [isMount]);

  return (
    <HomeLayout>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
        className="h-[400px] px-[100px] flex flex-col justify-center gap-2"
      >
        <h1 className="text-6xl text-[#FFDC58] font-bold w-[700px]">
          Book {futsalData.map((futsal) => futsal.futsalName)}{" "}
        </h1>
        <p className="text-white font-bold text-3xl">Booking made easier</p>
      </div>
      <div>
        <p className="text-center text-white text-5xl font-bold mt-[25px]">
          Details
        </p>
      </div>
      <div className="mt-[25px] flex justify-center items-center gap-[30px]">
        <div className="bg-[#FFFFFF] w-[620px] ml-[15px] h-[500px] flex-col">
          <p className="text-center text-black text-4xl font-bold p-[35px]">
            Basic Details:
          </p>
          <div className="flex gap-[25px] justify-center font-bold">
            <div className="text-[black]">
              <p className="underline-offset-1">Location:</p>
              <p className="underline-offset-2">Price Per Hour:</p>
              <p className="underline-offset-4">Opening Time:</p>
              <p className="underline-offset-8">Closing Time:</p>
              <p className="underline-offset-8">Status:</p>
            </div>
            <div className="text-[black]">
              <p className="underline-offset-1">{futsalData.map((futsal)=>futsal.futsalAddress)}</p>
              <p className="underline-offset-2">{futsalData.map((futsal)=>futsal.futsalPrice.day)}</p>
              <p className="underline-offset-4">
                {futsalData.map((futsal) => futsal.futsalOpeningTime)}
              </p>
              <p className="underline-offset-8">{futsalData.map((futsal)=>futsal.futsalClosingTime)}</p>
              <p className="underline-offset-8">{futsalData.map((futsal)=>futsal.futsalOpenStatus)}</p>
            </div>
          </div>
        </div>
            <div className="overflow-hidden relative absolute">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.941484331196!2d85.35038037434086!3d27.719092924975328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1962d1d5d6bf%3A0x43fcef9e567f899f!2sBhat-Bhateni%20Super%20Store%20Boudha%20Chuchepati!5e0!3m2!1sen!2snp!4v1711008771566!5m2!1sen!2snp" width="600" height="500" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div className="">
            <p className="text-center text-white text-5xl font-bold mt-[25px]">Booking</p>
      </div>
      <div className="text-center text-4xl text-white py-12 font-semibold">
        Booking
      </div>
      <div className="bg-white min-h-[500px] border-2 border-black px-[200px] mt-4">
        <p className="text-black font-semibold text-5xl text-center mt-2">
          Timetable
        </p>
        <div className="flex justify-between mt-12">
          <div className="">
            <Link
              to="/"
              className="flex gap-4 items-center text-blue-500 font-semibold text-xl"
            >
              <FaAnglesLeft className="text-blue-500" /> Previous
            </Link>
          </div>
          <div className=" text-xl flex gap-4 text-black">
            <p className="font-bold">Date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="outline-none font-semibold bg-white cursor-pointer"
            />
          </div>
          <Link
            to="/"
            className=" flex gap-4 items-center justify-center text-blue-500 font-semibold text-xl"
          >
            Next <FaAnglesRight className="text-blue-500" />
          </Link>
        </div>
        <div className="pb-12">
          <div className="flex  bg-black text-white h-20 items-center mt-4">
            <div className="px-20 border-r-2 border-white  h-full">
              <p className="text-4xl font-bold mt-4">Day</p>
            </div>
            <div className="grid grid-cols-2 grow">
              <p className="text-4xl font-bold justify-self-center">
                Time/Bookings
              </p>
              <div className="justify-self-end mr-4">
                <div className="flex gap-2 items-center">
                  <div className="w-[20px] h-[20px] bg-white border-2 border-black"></div>
                  <p className="font-semibold">Available</p>
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <div className="w-[20px] h-[20px] bg-[#FF3E3C] border-2 border-black"></div>
                  <p className="font-semibold">Booked</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {dates.map((date, index) => (
              <Booking
                date={date}
                day={dayNames[new Date(date).getDay()]}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default HomePage;
