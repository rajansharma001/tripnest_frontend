"use client";
import React from "react";
import SignupComponent from "../../../../components/global/auth/SignupComponent";
import { useProtectedRoute } from "../../../../context/useProtected";

const Signup = () => {
  useProtectedRoute([], true);
  return (
    <div className="w-full flex h-[700px] mt-17 py-10 px-5 md:px-15 lg:px-20">
      <SignupComponent />
    </div>
  );
};

export default Signup;
