import Link from "next/link";
import React from "react";

interface BtnProps {
  btnLink: string;
  btnStyle: string;
  btnTitle: string;
}
const LinkButton = ({ btnLink, btnStyle, btnTitle }: BtnProps) => {
  return (
    <Link
      href={btnLink}
      className={`${btnStyle}text-sm  capitalize flex items-center justify-center px-5 py-2 transition-all transform 
         hover:-translate-y-1 ease-in duration-300    cursor-pointer   rounded-sm   text-gray-100   `}
    >
      {btnTitle}
    </Link>
  );
};

export default LinkButton;
