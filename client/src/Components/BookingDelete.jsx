// eslint-disable-next-line no-unused-vars

import axiosInstance from '../Helpers/axiosInstance';

const BookingDeletePage = () => {
  const handleDelete = async (_id) => {
    try {
      await axiosInstance.delete(`/api/bookings/${_id}`); // Replace with your actual delete endpoint
      alert('bookings deleted successfully.');
      // Optionally, you can also update the UI to reflect the deletion
    } catch (error) {
      console.error('Error deleting bookingData:', error);
      alert('An error occurred while deleting bookingData.');
    }
  };

  return (
    <div>
      <h2>Booking Delete Page</h2>
      <button onClick={() => handleDelete("BOOKING_ID_TO_DELETE")}>
      BookingDeletePage
      </button>
    </div>
  );
};

export default BookingDeletePage;
