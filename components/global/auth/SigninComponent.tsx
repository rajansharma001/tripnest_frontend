"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ClickButton from "../ClickButton";
import { RiLoader2Fill } from "react-icons/ri";
import ToastMsg from "../ToastMsg";
import { useRouter } from "next/navigation";

const SigninComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const result = await res.json();
      setIsLoading(false);
      if (result.error) {
        setIsSuccess(false);
        setHasMsg(true);
        setMsg(`${result.error}`);
      } else {
        setIsSuccess(true);
        setHasMsg(true);
        setMsg(result.success || "Login successfull.");
        router.push("/");
      }
    } catch (error) {
      setMsg("Something went wrong. Please try again.");
      console.log("login submission error", error);
    }
  };

  useEffect(() => {
    if (hasMsg) {
      const timer = setTimeout(() => {
        setHasMsg(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasMsg]);
  return (
    <div className="w-full  rounded-sm shadow-xl shadow-gray-500 flex">
      <div className="w-full md:w-[50%] lg:[50%] bg-accent hidden lg:flex md:flex">
        <Image
          src={`/carImg.jpg`}
          alt="CarSlide"
          width={750}
          height={650}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-[50%] lg:[50%] flex justify-center items-center  p-5 lg:px-25 md:px-15 ">
        {hasMsg && (
          <ToastMsg
            style={`${isSuccess ? "bg-success" : "bg-error"}`}
            toastMsg={msg}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center">
            <RiLoader2Fill className="animate-spin  text-primary" size={35} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-md shadow-2xl shadow-black flex flex-col p-10 lg:py-20 gap-4 "
          >
            <h1 className="text-text-primary text-xl font-semibold uppercase text-center">
              Sign-In Form
            </h1>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id=""
              className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
              placeholder="example@gmail.com"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
              placeholder="****************"
            />
            <ClickButton
              btnTitle="Signin"
              btnStyle="bg-primary hover:bg-primary-hover"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default SigninComponent;
