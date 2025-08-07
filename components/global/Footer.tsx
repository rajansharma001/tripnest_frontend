import React from "react";

const Footer = () => {
  return (
    <div className="w-full">
      <div className=" p-20 bg-gray-800"></div>
      <div className=" p-2 bg-primary  flex items-center justify-center text-gray-100 text-sm gap-1">
        <p className="   "> ©TripNest All Rights Reserved. | Developed by</p>
        <a
          href="https://rajansharma.info.np"
          className="font-semibold hover:text-gray-200 transform transition-all duration-300 ease-in hover:-translate-y-0.5"
        >
          Rajan Sharma
        </a>
      </div>
    </div>
  );
};

export default Footer;
