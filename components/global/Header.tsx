"use client";
import React, { useState } from "react";
import Image from "next/image";
import ClickButton from "./ClickButton";
import Signin from "./auth/SignComponent";
import LinkButton from "./LinkButton";

const Header = () => {
  const user = "/defaultUser.jpeg";
  const [authFormOpen, setAuthFormOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center py-3 px:6 md:px-10 lg:px-15 bg-white shadow-gray-300 shadow-md ">
      <div>
        <Image
          src="/tripNestLogo.png"
          height={150}
          width={150}
          alt="logo"
          className="bg-cover"
        />
      </div>
      {!user && user ? (
        <div className=" border-2 border-primary border-dashed p-0.5 rounded-full">
          <Image
            src={`${user} || "/defaultUser.jpeg"`}
            height={150}
            width={150}
            alt="logo"
            className="bg-cover rounded-full h-12 w-12 cursor-pointer "
          />
        </div>
      ) : (
        <div className="w-full flex justify-end items-center gap-2">
          <LinkButton
            btnLink="/signin"
            btnTitle="Login"
            btnStyle="bg-transparent hover:text-text-secondary text-text-primary font-semibold"
          />
          <LinkButton
            btnLink="/signup"
            btnTitle="signup"
            btnStyle="bg-primary hover:bg-primary-hover text-text-primary text-white font-bold"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
