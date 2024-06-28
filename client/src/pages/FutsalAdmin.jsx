import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import BookedList from '../Components/BookedList';
import { getAllBookings } from '../redux/slices/bookingSlice';

function FutsalAdmin() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getDates();
        getEveryBookings();
    }, []);

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

    const getEveryBookings = async () => {
        await dispatch(getAllBookings());
    };

    let dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    return (
        <div className="bg-gray-100 w-full">
            <p className="text-black font-bold text-5xl text-center p-6 md:p-10">Timetable</p>

            

            {/* Timetable Grid */}
            <div className="px-4 md:px-20">
                <div className="flex bg-black text-white h-16 md:h-20 items-center mt-4">
                    <div className="w-[258px] border-r-2 border-white h-full px-4 flex justify-center items-center ">
                        <p className="text-xl md:text-3xl font-bold">Day</p>
                    </div>
                    <div className=" grid grid-cols-2 items-center px-4">
                        <p className="text-xl md:text-3xl font-bold">Time/Bookings</p>
                    </div>
                </div>

                {/* List of Bookings */}
                <div>
                    {dates.map((date, index) => (
                        <BookedList
                            key={index}
                            date={date}
                            day={dayNames[new Date(date).getDay()]}
                        />
                    ))}
                </div>
            </div>

            {/* Note */}
            <div className="text-center mt-4 mb-8 px-4 md:px-20">
                <p className="text-sm md:text-lg text-black font-bold">
                    * Please click the box to book, update, or see booker’s details
                </p>
            </div>
        </div>
    );
}

export default FutsalAdmin;
