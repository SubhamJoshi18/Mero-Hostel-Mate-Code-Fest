// src/App.js  document verification
import React, { useState } from "react";

const MyDocuments = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
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
      </div>

      {fileUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-lg font-semibold mb-4">Uploaded Document</h2>
          <img
            src={fileUrl}
            alt="Uploaded Document"
            className="w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
