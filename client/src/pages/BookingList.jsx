import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import { getAllBookings } from "../redux/slices/bookingSlice";

function BookingList() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state?.auth);
    const { bookedData } = useSelector((state) => state?.booking);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5); // Adjust as per your preference

    // Function to sort bookedData by date
    const sortBookingsByDate = (bookings) => {
        const sortedBookings = [...bookings];
        sortedBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedBookings;
    };

    // Function to filter bookings by id
    const filterBookingsById = (bookings, id) => {
        return bookings.filter((booking) => booking.userId._id === id);
    };

    // Fetch bookings when component mounts
    useEffect(() => {
        const getEveryBookings = async () => {
            await dispatch(getAllBookings());
        };
        getEveryBookings();
    }, [dispatch]);

    // Sort and filter bookings by id
    const sortedBookings = sortBookingsByDate(bookedData);
    const filteredBookings = filterBookingsById(sortedBookings, data._id);

    // Pagination logic
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let count = indexOfFirstBooking; // Adjust the starting count based on current page

    return (
        <HomeLayout>
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
                <div className="overflow-x-auto">
                    <div className="shadow-md overflow-auto border border-gray-300 rounded-lg">
                        <table className="table-auto min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                                <tr>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-r-2 border-gray-300">S.No.</th>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-r-2 border-gray-300">Booking Time</th>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-r-2 border-gray-300">Booking Date</th>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-r-2 border-gray-300">Booking Day</th>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-r-2 border-gray-300">Payment</th>
                                    <th className="py-3 px-6 text-left font-bold border-b-2 border-gray-300">Paid Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {currentBookings.map((booking, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-4 px-6 text-left border-b border-r border-gray-300 font-semibold">{++count}</td>
                                        <td className="py-4 px-6 text-left border-b border-r border-gray-300 font-semibold">{booking.time}</td>
                                        <td className="py-4 px-6 text-left border-b border-r border-gray-300 font-semibold">{booking.date}</td>
                                        <td className="py-4 px-6 text-left border-b border-r border-gray-300 font-semibold">{booking.day}</td>
                                        <td className="py-4 px-6 text-left border-b border-r border-gray-300 font-semibold">{booking.paymentMethod}</td>
                                        <td className="py-4 px-6 text-left border-b border-gray-300 font-semibold">Rs.{booking.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: Math.ceil(filteredBookings.length / bookingsPerPage) }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                                currentPage === i + 1 ? "bg-gray-200 text-gray-700" : "text-gray-500"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default BookingList;
