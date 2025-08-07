import Link from "next/link";
import React from "react";

interface BtnProps {
  btnClick?: () => void;
  passingFunc?: () => void;
  btnStyle: string;
  btnTitle: string;
}
const ClickButton = ({ btnClick, btnStyle, btnTitle }: BtnProps) => {
  return (
    <button
      onClick={btnClick}
      className={`${btnStyle}text-sm text-white capitalize flex items-center justify-center px-5 py-2 transition-all transform 
         hover:-translate-y-1 ease-in duration-300    cursor-pointer     `}
    >
      {btnTitle}
    </button>
  );
};

export default ClickButton;
