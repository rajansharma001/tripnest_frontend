"use client";
import React from "react";
import SigninComponent from "../../../../components/global/auth/SigninComponent";
import { useProtectedRoute } from "../../../../context/useProtected";
import { useAuth } from "../../../../context/authContext";

const Signin = () => {
  useProtectedRoute([], true);
  const { user } = useAuth();
  return (
    <div className="w-full flex h-[500px] md:h-[700px] lg:h-[700px] mt-17 py-10 px-5 md:px-15 lg:px-20">
      <SigninComponent />
    </div>
  );
};

export default Signin;
