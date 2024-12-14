import React, { useState } from 'react';
import axios from 'axios';

const MyDocuments = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('/user/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response);
      setSuccessMessage('File uploaded successfully!');
      setFile(null);
      setFileUrl('');
    } catch (error) {
      setErrorMessage('Error uploading file. Please try again.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Upload Document (PDF*)</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all w-full"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {errorMessage}
          </div>
        )}
      </div>

      {fileUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-lg font-semibold mb-4">Uploaded Document</h2>
          <embed
            src={fileUrl}
            type="application/pdf"
            className="w-full h-96 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
