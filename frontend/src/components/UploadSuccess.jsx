/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadSuccess = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the success message from the server (if needed)
    axios.get('/api/success-message') // Update with your actual API endpoint if needed
      .then(response => {
        setMessage(response.data.message); // Assuming response contains a message property
      })
      .catch(error => {
        console.error('There was an error fetching the success message!', error);
      });
  }, []);

  const handleUploadAnother = () => {
    // Redirect to the upload page (you can use React Router or simple window.location)
    window.location.href = '/admin/uploadDocument';
  };

  return (
    <div>
      <h2>Upload Successful</h2>
      <p>{message}</p>
      <button onClick={handleUploadAnother}>Upload another file</button>
    </div>
  );
};

export default UploadSuccess;