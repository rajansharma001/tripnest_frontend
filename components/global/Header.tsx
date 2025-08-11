"use client";
import React, { useState } from "react";
import Image from "next/image";
import ClickButton from "./ClickButton";
import Signin from "./auth/SigninComponent";
import LinkButton from "./LinkButton";
import Link from "next/link";
import { useAuth } from "../../context/authContext";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BiArrowToBottom } from "react-icons/bi";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center py-3 px:6 md:px-10 lg:px-15 bg-white shadow-gray-300 shadow-md ">
      <div>
        <Link href="/">
          <Image
            src="/tripNestLogo.png"
            height={150}
            width={150}
            alt="logo"
            className="bg-cover"
          />
        </Link>
      </div>
      {user && user ? (
        <div className=" flex gap-2">
          <div className="flex flex-col justify-center items-center gap-0">
            <h1 className="text-text-primary font-bold text-[12px]">
              {user.firstName}
            </h1>
            <h2 className="text-text-primary font-semibold text-sm">
              {user.role}
            </h2>
          </div>
          <div className=" border-2 border-primary border-dashed p-0.5 rounded-full">
            <Image
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              src={"/defaultUser.jpeg"}
              height={150}
              width={150}
              alt="userImg"
              className="bg-cover rounded-full h-10 w-10 cursor-pointer"
            />
          </div>
          <div className=" ">
            <button
              onClick={logoutUser}
              className="text-sm font-semibold p-2 bg-primary rounded-sm text-white hover:bg-primary-hover w-full hover:text-gray-100 transition-all hover:-translate-y-1 ease-in duration-300 text-left cursor-pointer "
            >
              Logout
            </button>
          </div>
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

      {isProfileOpen && (
        <BiArrowToBottom
          className="absolute top-18 right-3 md:right-13 lg:right-18"
          size={25}
        />
      )}

      {isProfileOpen && (
        <div className="absolute top-20 right-3 z-50 bg-white md:right-7 lg:right-10 :w-[5%] lg:w-[18%] md:w-[13%] flex flex-col items-start  p-3 shadow-2xl shadow-gray-600 rounded-sm transition-all hover:-translate-y-1 ease-in duration-300">
          {/* <a
            href="/user/dashboard"
            className="text-sm font-semibold p-2 hover:bg-primary-hover w-full hover:text-gray-100 transition-all hover:-translate-y-1 ease-in duration-300"
          >
            Dashboard
          </a>
          <a
            href="/user/profile"
            className="text-sm font-semibold p-2 hover:bg-primary-hover w-full hover:text-gray-100 transition-all hover:-translate-y-1 ease-in duration-300 "
          >
            Profile
          </a> */}
        </div>
      )}
    </div>
  );
};

export default Header;
