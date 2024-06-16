// eslint-disable-next-line no-unused-vars

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Helpers/axiosInstance';
const EditPage = () => {
const navigate=useNavigate()
  const {id}=useParams();
  console.log(id);
  const [editData,setEditData]=useState({
    fullName:'',
    role:""
  })
    const handleInput=(e)=>{
        const {value,name}=e.target;
        setEditData({
            ...editData,
            [name]:value
        })
    }
  const handleEdit = async (userId) => {
    console.log(userId);
    try {
       await axiosInstance.put(`/user/edit/${userId}`,
        editData
      );
      alert('User edit successfully.');
      navigate("/user")
      // Optionally, update the UI to reflect the update
    } catch (error) {
      console.error('Error editing user:', error);
      alert('An error occurred while eaditing user.');
    }
  };

  return (
    <div>
      <h2>Edit Page</h2>
      
      <div>
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            value={editData.fullName}

            onChange={handleInput}
          />
        </label>
      </div>
      <div>
        <label>
          roll:
          <input
            type="text"
            name="role"
            value={editData.role}
            onChange={handleInput}
          />
        </label>
      </div>
     
      <button onClick={() => handleEdit(id)}>
        Edit User
      </button>
    </div>
  );
};

export default EditPage;
