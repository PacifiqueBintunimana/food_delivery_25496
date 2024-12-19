// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import api from './api';

const DownloadUsers = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/download/users', {
        responseType: 'blob',
        headers: {
          'Accept': 'application/octet-stream'
        }
      });
      
      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Download Users Data</h2>
      <button 
        onClick={handleDownload} 
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Downloading...' : 'Download Users'}
      </button>
    </div>
  );
};

export default DownloadUsers;
