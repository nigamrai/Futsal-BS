// eslint-disable-next-line no-unused-vars

import { useState } from 'react';
import axiosInstance from '../Helpers/axiosInstance';
import { useNavigate, useParams} from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
const EditBooking = () => {
const navigate=useNavigate()
  const {id}=useParams();
  console.log(id);
  const [editData,setEditData]=useState({
    time:""
  })
    const handleInput=(e)=>{
        const {value,name}=e.target;
        setEditData({
            ...editData,
            [name]:value
        })
    }
  const handleEdit = async (bookingId) => {
    console.log(bookingId);
    try {
       await axiosInstance.put(`/booking/edit/${bookingId}`,
        editData
      );
      alert('Booking edit successfully.');
      navigate("/futsaladmin")
      // Optionally, update the UI to reflect the update
    } catch (error) {
      console.error('Error editing bookingTime:', error);
      alert('An error occurred while eaditing Book.');
    }
  };

  return (
    <HomeLayout>
      <div className='h-[550px] bg-white'>
      <h2>Edit Page</h2>
      <div>
        <label>
          time:
          <input
            type="string"
            name="time"
            value={editData.time}
            onChange={handleInput}
          />
        </label>
      </div>
     
      <button onClick={() => handleEdit(id)}>
        Delete BookingData
      </button>
    </div>
    </HomeLayout>
    
  );
};

export default EditBooking;
