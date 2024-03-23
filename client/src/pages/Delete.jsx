// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

const DeletePage = () => {
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/users/${_id}`); // Replace with your actual delete endpoint
      alert('User deleted successfully.');
      // Optionally, you can also update the UI to reflect the deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting user.');
    }
  };

  return (
    <div>
      <h2>Delete Page</h2>
      <button onClick={() => handleDelete("USER_ID_TO_DELETE")}>
        Delete User
      </button>
    </div>
  );
};

export default DeletePage;
