"use client";
import React, { useEffect, useState } from "react";
import TripForm from "./TripForm";
import { useAuth } from "../../context/authContext";
import ClickButton from "./ClickButton";
import {
  BudgetBreakDown,
  DailyPlan,
  LocalTips,
  Summary,
  TripOverview,
  TripTypes,
} from "../../types";
import { CgClose } from "react-icons/cg";

const Hero = () => {
  const { user } = useAuth();
  const [tripViewOpen, setTripViewOpen] = useState(false);
  const [lastTrip, setLastTrip] = useState<TripTypes>();

  const fetchLastTrip = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trip/get-trip`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setLastTrip(result.latestTrip);
    } catch (error) {
      console.log("Fetching error", error);
    }
  };

  useEffect(() => {
    fetchLastTrip();
  }, [tripViewOpen]);

  return (
    <div className="relative w-full mt-18 bg-[url('/carImg1.jpg')] h-[600px] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="w-full p-5 backdrop-blur-[8px]">
        <h1 className="text-center text-3xl font-extrabold text-white tracking-wide drop-shadow-lg capitalize">
          Find your dream vacation with TripNest AI
        </h1>
        <TripForm />
        {user && lastTrip && (
          <div className="w-full flex bottom-3 items-center justify-center mt-4">
            <ClickButton
              btnTitle="View your last trip"
              btnClick={() => setTripViewOpen(!tripViewOpen)}
              btnStyle="bg-primary hover:bg-primary-hover text-text-primary"
            />
          </div>
        )}
      </div>

      {tripViewOpen && (
        <div className="absolute w-full shadow-2xl shadow-black rounded-lg h-screen p-6">
          <div className="relative max-w-5xl mx-auto p-6 space-y-6 top-10 overflow-scroll h-screen backdrop-blur-2xl">
            <CgClose
              onClick={() => setTripViewOpen(!tripViewOpen)}
              className="absolute right-10 top-10 cursor-pointer text-white hover:text-gray-200 transition"
              size={24}
              aria-label="Close trip view"
            />

            {/* Trip Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <h1 className="text-3xl font-bold">{lastTrip?.tripTitle}</h1>
              <p className="mt-2 text-lg font-medium">
                {lastTrip?.currentLocation} → {lastTrip?.tripLocation}
              </p>
              <p className="text-sm opacity-80">
                {new Date(lastTrip?.startDate as Date).toDateString()} –{" "}
                {new Date(lastTrip?.endDate as Date).toDateString()}
              </p>
              <div className="mt-3 flex flex-col gap-y-1 text-sm">
                <p>Type: {lastTrip?.tripType}</p>
                <p>People: {lastTrip?.numberOfPeople}</p>
                <p className="col-span-2 text-red-200">
                  Visibility: {lastTrip?.visibility ? "True" : "False"}
                </p>
              </div>
            </div>

            {/* Trip Overview */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">
                Trip Overview
              </h2>
              <div className="space-y-3 text-gray-700">
                {lastTrip?.tripOverview?.map(
                  (
                    { destination, duration, budget }: TripOverview,
                    index: number
                  ) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg">{destination}</h3>
                      <p className="text-sm">Duration: {duration}</p>
                      <p className="text-sm">Budget: {budget}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Daily Plan */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">
                Daily Plan
              </h2>
              <div className="space-y-4">
                {lastTrip?.dailyPlan?.map(
                  ({ day, title, activities }: DailyPlan, index: number) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg">{day}</h3>
                      <p className="text-gray-600 mb-1">{title}</p>
                      <ul className="list-disc ml-5 space-y-1 text-gray-700">
                        {activities.map((list: string, idx: number) => (
                          <li key={idx}>{list}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">
                Budget Breakdown
              </h2>
              {lastTrip?.budgetBreakdown?.map(
                (
                  {
                    totalBudget,
                    travel,
                    accommodation,
                    food,
                    activitiesAndTransport,
                    note,
                  }: BudgetBreakDown,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 text-sm text-gray-700"
                  >
                    <p>
                      <strong>Total Budget:</strong> {totalBudget}
                    </p>
                    <p>
                      <strong>Travel:</strong> {travel}
                    </p>
                    <p>
                      <strong>Accommodation:</strong> {accommodation}
                    </p>
                    <p>
                      <strong>Food:</strong> {food}
                    </p>
                    <p>
                      <strong>Activities & Transport:</strong>{" "}
                      {activitiesAndTransport}
                    </p>
                    <p>
                      <strong>Note:</strong> {note}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Local Tips */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">
                Local Tips
              </h2>
              {lastTrip?.localTips?.map(
                (
                  {
                    currency,
                    transport,
                    shopping,
                    dressCode,
                    bestTimeToVisit,
                    safety,
                  }: LocalTips,
                  index: number
                ) => (
                  <div key={index} className="space-y-1 text-gray-700">
                    <p>
                      <strong>Currency:</strong> {currency}
                    </p>
                    <p>
                      <strong>Transport:</strong> {transport}
                    </p>
                    <p>
                      <strong>Shopping:</strong> {shopping}
                    </p>
                    <p>
                      <strong>Dress Code:</strong> {dressCode}
                    </p>
                    <p>
                      <strong>Best Time to Visit:</strong> {bestTimeToVisit}
                    </p>
                    {safety && (
                      <>
                        <p className="font-semibold mt-2">Safety:</p>
                        <ul className="list-disc ml-5 space-y-1">
                          {safety.map((tip: string, idx: number) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">Summary</h2>
              {lastTrip?.summary?.map(
                (
                  { highlights, recommendation, extras }: Summary,
                  index: number
                ) => (
                  <div key={index} className="text-gray-700">
                    <h3 className="font-semibold text-lg">Highlights</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      {highlights.map((highlight: string, idx: number) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                    <h3 className="mt-4 font-semibold text-lg">
                      Recommendation
                    </h3>
                    <p>{recommendation}</p>
                    <h3 className="mt-4 font-semibold text-lg">Extras</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      {extras.map((extra: string, idx: number) => (
                        <li key={idx}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
