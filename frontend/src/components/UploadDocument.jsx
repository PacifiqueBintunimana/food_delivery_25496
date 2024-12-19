/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const UploadDocuments = () => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch uploaded files from the backend
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/admin/uploadDocument");
      if (!response.ok) throw new Error("Failed to fetch uploaded files.");
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("Error fetching uploaded files.");
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.file.files[0];

    if (!file) return;

    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8082/apiadmin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("File upload failed.");

      setMessage("File uploaded successfully!");
      fetchUploadedFiles(); // Refresh the list of files after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/admin/delete/${fileName}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("File deletion failed.");

      setMessage("File deleted successfully!");
      fetchUploadedFiles(); // Refresh the list of files after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("Error deleting file.");
    }
  };

  return (
    <div>
      <h1>Upload a Document</h1>

      {message && <div className="alert"><p>{message}</p></div>}

      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <label htmlFor="file">Choose file to upload:</label>
        <input type="file" name="file" id="file" required />
        <button type="submit">Upload</button>
      </form>

      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files</h2>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file}>
                <a
                  href={`http://localhost:8082/api/admin/view/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>{" "}
                |{" "}
                <a
                  href={`http://localhost:8082/api/admin/download/${file}`}
                  download
                >
                  Download
                </a>{" "}
                |{" "}
                <button onClick={() => handleDeleteFile(file)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
