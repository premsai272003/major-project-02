import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash, LuCamera } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onChooseFile}
      >
        {!image ? (
          <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-700 dark:to-gray-600 rounded-full relative shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <LuUser className="text-4xl text-primary dark:text-purple-300" />

            {/* Upload button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <LuCamera className="text-white text-xl" />
            </div>

            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                onChooseFile();
              }}
            >
              <LuUpload size={16} />
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="profile photo"
              className="w-24 h-24 rounded-full object-cover shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            />

            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <LuCamera className="text-white text-xl" />
            </div>

            {/* Remove button */}
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <LuTrash size={16} />
            </button>
          </div>
        )}

        {/* Helper text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {image ? 'Click to change photo' : 'Click to add photo'}
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
