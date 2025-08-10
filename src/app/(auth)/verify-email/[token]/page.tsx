"use client";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ToastMsg from "../../../../../components/global/ToastMsg";
import { RiLoader2Fill } from "react-icons/ri";

const VerifyEmail = () => {
  const params = useParams();
  const { token } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const handleVerification = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result.error);
      setIsLoading(false);
      if (!result) {
        setHasMsg(true);
        setIsSuccess(false);
        setMsg(`Invalid or expired verification link. ${result.error}`);
      } else {
        setHasMsg(true);
        setIsSuccess(true);
        setMsg(`Your account is now verified. Please proced to signin.`);
      }
    } catch (error) {
      console.log("verification error", error);
    }
  };
  useEffect(() => {
    handleVerification();
  }, [token]);

  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center">
      {hasMsg && (
        <div className="w-full lg:w-[80%] md:w-[80%] flex justify-center items-center text-center">
          <div className="p-5 w-full shadow-2xl shadow-gray-500 text-white bg-success">
            {msg}{" "}
            <a href="/signin" className="text-error font-semibold underline">
              Click Here
            </a>
          </div>
        </div>
      )}

      {isLoading ?? (
        <div className="flex justify-center items-center">
          <RiLoader2Fill className="animate-spin  text-primary" size={35} />
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
