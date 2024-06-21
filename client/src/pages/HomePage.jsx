import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Booking from "../Components/Booking";
import HomeLayout from "../Layouts/HomeLayout";
import background from "../assets/images/background.png";
import { futsalDetails } from "../redux/slices/futsalSlice";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { futsalData } = useSelector((state) => state?.futsal);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();

  async function getFutsalDetails() {
    await dispatch(futsalDetails());
  }

  const [price, setPrice] = useState({
    morning: "",
    day: "",
    evening: "",
  });

  const getDates = () => {
    let currentDate = new Date();
    let datesArray = [];

    for (let i = 1; i <= 7; i++) {
      let formattedDate = currentDate.toISOString().slice(0, 10);
      datesArray.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDates(datesArray);
  };

  useEffect(() => {
    getFutsalDetails();
    getDates();
  }, []);

  useEffect(() => {
    if (futsalData.length > 0) {
      const { morning, day, evening } = futsalData[0].futsalPrice;
      setPrice({ morning, day, evening });
    }
  }, [futsalData]);

  return (
    <HomeLayout>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
        className="h-[400px] px-6 md:px-12 flex flex-col justify-center items-center gap-2 rounded-lg"
      >
        <h1 className="text-4xl md:text-6xl font-bold max-w-[700px] text-center text-white">
          Book {futsalData.map((futsal) => futsal.futsalName)}{" "}
        </h1>
        <p className="text-white font-bold text-2xl text-center">
          Booking made easier
        </p>
      </div>

      <div className="mt-8 md:mt-12">
        <p className="text-center text-black text-5xl font-bold">Details</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 mt-8 flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-12 py-8">
        {/* Basic Details Card */}
        <div className="bg-white w-full md:w-[50%] xl:w-[40%] rounded-lg shadow-md p-6">
          <p className="text-center text-black text-3xl font-bold mb-4">
            Basic Details:
          </p>
          <div className="flex flex-col gap-4">
            {/* Location */}
            <div className="flex flex-col">
              <p className="text-lg font-bold">Location:</p>
              <p className="pl-4">
                {futsalData.map((futsal) => futsal.futsalAddress)}
              </p>
            </div>

            {/* Price Per Hour */}
            <div className="flex flex-col">
              <p className="text-lg font-bold mt-4">Price Per Hour:</p>
              <div className="pl-4 flex flex-col gap-2">
                <p>
                  Morning:{" "}
                  {futsalData.map((futsal) => futsal.futsalPrice.morning)}
                </p>
                <p>Day: {futsalData.map((futsal) => futsal.futsalPrice.day)}</p>
                <p>
                  Evening:{" "}
                  {futsalData.map((futsal) => futsal.futsalPrice.evening)}
                </p>
              </div>
            </div>

            {/* Opening and Closing Time */}
            <div className="flex flex-col">
              <p className="text-lg font-bold mt-4">
                Opening and Closing Time:
              </p>
              <div className="pl-4 flex flex-col gap-2">
                <p>
                  Opening Time:{" "}
                  {futsalData.map((futsal) => futsal.futsalOpeningTime)}
                </p>
                <p>
                  Closing Time:{" "}
                  {futsalData.map((futsal) => futsal.futsalClosingTime)}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <p className="text-lg font-bold mt-4">Status:</p>
              <p className="pl-4">
                {futsalData.map((futsal) => futsal.futsalOpenStatus)}
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Card */}
        <div className="overflow-hidden w-full md:w-[50%] xl:w-[60%] h-[300px] md:h-[500px] rounded-lg shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.941484331196!2d85.35038037434086!3d27.719092924975328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1962d1d5d6bf%3A0x43fcef9e567f899f!2sBhat-Bhateni%20Super%20Store%20Boudha%20Chuchepati!5e0!3m2!1sen!2snp!4v1711008771566!5m2!1sen!2snp"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      <div className="text-center text-black text-5xl font-bold mt-[25px]">
        Booking
      </div>
      <div
        className="bg-white rounded-lg shadow-md border-2 border-gray-200 px-[20px] md:px-[20px] mt-4 mb-4 w-full "
        id="timetable"
      >
        <p className="text-black font-semibold text-5xl text-center mt-2">
          Timetable
        </p>
        <div className="font-bold">
          <p>*Please click the box of respective times to book</p>
          <p>*50% payment is compulsory for booking</p>
          <p>*Paid amount is non-refundable</p>
        </div>
        <div className="pb-12 w-full">
          <div className="flex flex-col md:flex-row w-full bg-black text-white h-20 items-center mt-4 rounded-t-lg">
            {/* Left Section */}
            <div className="px-4 md:px-8 lg:px-20 border-r-2 border-white h-full flex justify-center items-center">
              <p className="text-4xl font-bold mt-4 md:mt-0">Day</p>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex grid-cols-1 md:grid-cols-2 flex-grow px-4 justify-between">
              {/* Top Right Section */}
              <p className="text-4xl font-bold justify-self-center md:justify-self-start mt-4 md:mt-0 px-4 md:px-0">
                Time/Bookings
              </p>

              {/* Bottom Right Section */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4  items-center  justify-center md:justify-end px-4 md:px-0">
                <div className="w-4 h-4 md:w-[20px] md:h-[20px] bg-white border-2 border-black"></div>
                <p className="font-semibold">Available</p>
                <div className="w-4 h-4 md:w-[20px] md:h-[20px] bg-[#FF3E3C] border-2 border-black ml-2"></div>
                <p className="font-semibold">Booked</p>
              </div>
            </div>
          </div>

          <div>
            {dates.map((date, index) => (
              <Booking
                date={date}
                day={dayNames[new Date(date).getDay()]}
                key={index}
                price={price}
                setPrice={setPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
