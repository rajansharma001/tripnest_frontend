"use client";
import React, { FormEvent, useEffect, useState } from "react";
import ClickButton from "./ClickButton";
import { useAuth } from "../../context/authContext";
import LinkButton from "./LinkButton";
import { RiLoader2Fill } from "react-icons/ri";
import ToastMsg from "./ToastMsg";

const TripForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    tripTitle: "",
    currentLocation: "",
    tripLocation: "",
    budget: "",
    startDate: "",
    endDate: "",
    tripType: "",
    numberOfPeople: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trip/new-trip`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
        setMsg(result.success || "Trip Generated.");

        setFormData({
          tripTitle: "",
          currentLocation: "",
          tripLocation: "",
          budget: "",
          startDate: "",
          endDate: "",
          tripType: "",
          numberOfPeople: "",
        });
      }
    } catch (error) {
      setMsg("Something went wrong. Please try again.");
      console.log("Something went wrong. Please try again.", error);
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
    <div className="w-full flex justify-center items-center rounded-sm   ">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RiLoader2Fill className="animate-spin  text-primary" size={35} />
          <h1 className="text-white text-sm">NestTrip Generating...</h1>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-[75%] flex  flex-col flex-wrap justify-center items-center rounded-sm p-5 gap-2 bg-gray-100 shadow-3xl shadow-gray-600"
        >
          <div className="w-full flex justify-center items-center gap-2 ">
            <div className="w-3/12">
              <input
                type="text"
                value={formData.tripTitle}
                onChange={handleChange}
                name="tripTitle"
                placeholder="Trip Title"
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
              />
            </div>
            <div className="w-3/12">
              <input
                type="text"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="Your Location"
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="currentLocation"
              />
            </div>
            <div className="w-3/12">
              <input
                type="text"
                value={formData.tripLocation}
                onChange={handleChange}
                placeholder="Trip Destination"
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="tripLocation"
              />
            </div>
            <div className="w-3/12">
              <select
                name="tripType"
                id=""
                value={formData.tripType}
                onChange={handleChange}
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
              >
                <option value="">Select Trip Type</option>
                <option value="solo">Solo</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-2 ">
            <div className="w-3/12">
              <input
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="startDate"
              />
            </div>
            <div className="w-3/12">
              <input
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="endDate"
              />
            </div>
            <div className="w-2/12">
              <input
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget in USD"
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="budget"
              />
            </div>
            <div className="w-2/12">
              <input
                type="number"
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder="Number of People"
                className="p-2 text-text-primary text-sm focus:outline-primary border-2 border-gray-200 rounded-sm w-full"
                name="numberOfPeople"
              />
            </div>
            <div className="w-2.5/12">
              {user ? (
                <ClickButton
                  btnTitle="Generate trip"
                  btnStyle="bg-primary hover:bg-primary-hover text-text-primary"
                />
              ) : (
                <LinkButton
                  btnLink="/signin"
                  btnTitle="Need Signin"
                  btnStyle="bg-primary hover:bg-primary-hover"
                />
              )}
            </div>
          </div>
          {hasMsg && (
            <ToastMsg
              style={`${isSuccess ? "bg-success" : "bg-error"}`}
              toastMsg={msg}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default TripForm;
