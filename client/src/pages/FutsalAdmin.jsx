import { Link } from "react-router-dom";
import FutsalLayout from "../Layouts/FutsalLayout";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import BookedList from "../Components/BookedList";
import { useDispatch } from "react-redux";
import { getAllBookings } from "../redux/slices/bookingSlice";

function FutsalAdmin(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch=useDispatch();
    let dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const [dates, setDates] = useState([]);

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
      async function getEveryBookings(){
        await dispatch(getAllBookings());
      }

      useEffect(() => {
        getDates();
        getEveryBookings();
      }, []);
   return <FutsalLayout>
           <div className="bg-white w-full">
                <p className="text-black font-bold text-5xl text-center p-10">Timetable</p>            
                <div className="text-black font-bold px-[100px]">
                    
                   
                   
                    <div className="pb-12 ">
                    <div className="flex  bg-black text-white h-20 items-center mt-4">
                        <div className="px-20 border-r-2 border-white  h-full">
                        <p className="text-4xl font-bold mt-4">Day</p>
                        </div>
                        <div className="grid grid-cols-2 grow items-center">
                        <p className="text-4xl font-bold">
                            Time/Bookings
                        </p>
                        <div className="justify-self-end mr-4">
                            <div className="flex gap-2 items-center">
                            <div className="w-[20px] h-[20px] bg-white border-2 border-black"></div>
                            <p className="font-semibold">Available</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <div className="w-[20px] h-[20px] bg-[#FC0101] border-2 border-black"></div>
                            <p className="font-semibold">Full Payment</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <div className="w-[20px] h-[20px] bg-[#FFAC33] border-2 border-black"></div>
                            <p className="font-semibold">Half Payment</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div>
                        {dates.map((date, index) => (
                        <BookedList
                            date={date}
                            day={dayNames[new Date(date).getDay()]}
                            key={index}
                        />
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-black text-2xl font-bold">
                *Please click the box to book, update or see booker’s details
                </p>
            </div>
        </div>
   </FutsalLayout>

} 
export default FutsalAdmin;