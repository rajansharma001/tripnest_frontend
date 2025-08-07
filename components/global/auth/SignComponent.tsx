"use client";
import Image from "next/image";
import React, { useState } from "react";
import ClickButton from "../ClickButton";

const SignComponent = () => {
  return (
    <div className="w-full  rounded-sm shadow-xl shadow-gray-500 flex">
      <div className="w-[50%] bg-accent">
        <Image
          src={`/carImg.jpg`}
          alt="CarSlide"
          width={750}
          height={650}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[50%]  p-20 ">
        <form
          action=""
          className="w-full rounded-md shadow-2xl shadow-black flex flex-col p-20 gap-6 "
        >
          <h1 className="text-text-primary text-xl font-semibold uppercase text-center">
            Login Form
          </h1>
          <input
            type="text"
            name="email"
            id=""
            className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm"
            placeholder="example@gmail.com"
          />
          <input
            type="password"
            name="password"
            className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm "
            placeholder="****************"
          />
          <ClickButton
            btnTitle="Signin"
            btnStyle="bg-primary hover:bg-primary-hover"
          />
        </form>
      </div>
    </div>
  );
};

export default SignComponent;
