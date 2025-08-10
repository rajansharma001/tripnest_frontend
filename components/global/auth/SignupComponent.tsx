"use client";
import React, { FormEvent, useEffect, useState } from "react";
import ClickButton from "../ClickButton";
import Image from "next/image";
import ToastMsg from "../ToastMsg";
import { AiFillAccountBook, AiOutlineLoading } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { RiLoader2Fill } from "react-icons/ri";

interface FormProps {
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  phone: string;
  email: string;
}

const SignupComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState<FormProps>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      setIsLoading(false);
      if (!result) {
        setIsSuccess(false);
        setHasMsg(true);
        setMsg(result.error);
      } else {
        setIsSuccess(true);
        setHasMsg(true);
        setMsg(result.success);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      console.log(error);
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
          src={`/carImgg.jpg`}
          alt="CarSlide"
          width={750}
          height={650}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-[50%] lg:[50%] flex flex-col justify-center items-center   p-5 lg:px-25 md:px-15 ">
        <div className="w-full rounded-md py-5 shadow-2xl shadow-gray-600">
          <h1 className="text-text-primary  text-xl font-semibold uppercase text-center">
            Signup Form
          </h1>
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
              action=""
              className="w-full flex flex-col p-10 gap-4 "
            >
              <div className="w-full flex gap-4 flex-wrap">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="w-full flex flex-wrap gap-4">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                  placeholder="your-email@gmail.com"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="w-full flex flex-wrap gap-4">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full "
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  onChange={handleChange}
                  value={formData.confirm_password}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                  className={`
               p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full `}
                />
              </div>
              {formData.password !== formData.confirm_password ? (
                <p className="text-error">🙅‍♂️ Confirm password did not match.</p>
              ) : (
                <ClickButton
                  btnTitle="Signin"
                  btnStyle="bg-primary hover:bg-primary-hover w-full"
                />
              )}
            </form>
          )}
          {isSuccess && (
            <div className="w-full flex justify-center items-baseline">
              <div className="w-[95%] p-5 text-sm bg-primary shadow-md shadow-gray-500 text-white  capitalize">
                Please verify your account. Verification link has been sent to
                your email.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
