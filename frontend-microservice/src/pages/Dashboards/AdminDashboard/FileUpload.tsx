import React, { useState } from "react";

export const FileUpload = () => {
  const [formData, setFormData] = useState<{
    virtualTour: {
      photos: File[];
      videos: File[];
    };
  }>({
    virtualTour: {
      photos: [],
      videos: [],
    },
  });

  // Handle File Upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photos" | "videos"
  ) => {
    const files = Array.from(e.target.files || []);
    setFormData((prevData) => ({
      ...prevData,
      virtualTour: {
        ...prevData.virtualTour,
        [type]: [...prevData.virtualTour[type], ...files],
      },
    }));
  };

  // Remove File
  const removeFile = (index: number, type: "photos" | "videos") => {
    setFormData((prevData) => {
      const updatedFiles = [...prevData.virtualTour[type]];
      updatedFiles.splice(index, 1);
      return {
        ...prevData,
        virtualTour: {
          ...prevData.virtualTour,
          [type]: updatedFiles,
        },
      };
    });
  };

  return (
    <div className="p-6 bg-gray-100 mt-8 rounded-xl">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">File Upload</h1>

      {/* Photos Upload Section */}
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload Hostel Photos
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-300 group cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                className="w-10 h-10 text-gray-400 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-sm text-gray-400 group-hover:text-blue-600 pt-1">
                Select photos
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "photos")}
            />
          </label>
        </div>
        {formData.virtualTour.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.virtualTour.photos.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  onClick={() => removeFile(index, "photos")}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Videos Upload Section */}
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload Hostel Videos
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-300 group cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                className="w-10 h-10 text-gray-400 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-sm text-gray-400 group-hover:text-blue-600 pt-1">
                Select videos
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "videos")}
            />
          </label>
        </div>
        {formData.virtualTour.videos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.virtualTour.videos.map((file, index) => (
              <div key={index} className="relative">
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-24 object-cover rounded"
                  controls
                />
                <button
                  onClick={() => removeFile(index, "videos")}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
