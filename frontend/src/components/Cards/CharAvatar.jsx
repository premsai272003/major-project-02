import React from "react";
import { getInitials } from "../../utils/helper"; //  make sure path is correct

const CharAvatar = ({ fullName = "", width = "w-12", height = "h-12", style = "" }) => {
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} rounded-full bg-blue-500 text-white font-semibold ${style}`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
