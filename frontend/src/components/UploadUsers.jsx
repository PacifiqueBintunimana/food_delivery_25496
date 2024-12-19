// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import api from './api';

const UploadUsers = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const validateFile = (file) => {
    // Size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setValidationMessage('File size must be less than 5MB');
      return false;
    }

    // File type validation
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    if (!allowedTypes.includes(file.type)) {
      setValidationMessage('Only Excel (.xlsx, .xls) and CSV files are allowed');
      return false;
    }

    setValidationMessage('');
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      event.target.value = '';
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const response = await api.post('/admin/upload/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        setValidationMessage('Users uploaded successfully');
        setFile(null);
        event.target.reset();
      }
    } catch (error) {
      const errorMessage = error.response?.data || 'Please ensure your file contains valid role values (ROLE_USER, ROLE_ADMIN)';
      setValidationMessage(`Upload failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Upload Users Data</h2>
          
          <div className="alert alert-info">
            <h5>File Requirements:</h5>
            <ul>
              <li>File types: .xlsx, .xls, .csv</li>
              <li>Maximum size: 5MB</li>
              <li>Valid role values: ROLE_USER, ROLE_ADMIN</li>
            </ul>
          </div>

          {validationMessage && (
            <div className={`alert ${validationMessage.includes('success') ? 'alert-success' : 'alert-danger'}`}>
              {validationMessage}
            </div>
          )}

          <form onSubmit={handleUpload}>
            <div className="mb-3">
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!file || loading}
            >
              {loading ? 'Uploading...' : 'Upload Users'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadUsers;
