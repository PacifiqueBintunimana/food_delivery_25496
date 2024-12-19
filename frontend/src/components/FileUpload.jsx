// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import api from './api';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('File uploaded successfully');
      setFile(null);
      event.target.reset();
    } catch (error) {
      setMessage('Upload failed: ' + error.response?.data || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Upload Files</h2>
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleUpload}>
            <div className="mb-3">
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange}
                accept=".pdf,.csv,.xlsx,.xls,.doc,.docx"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!file || loading}
            >
              {loading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
