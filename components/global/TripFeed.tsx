"use client";
import React, { useEffect, useState } from "react";
import {
  BudgetBreakDown,
  DailyPlan,
  LocalTips,
  Summary,
  TripOverview,
  TripTypes,
  UserTypes,
} from "../../types";
import { CgClose } from "react-icons/cg";

const TripFeed = () => {
  const [tripFeed, setTripFeed] = useState<TripTypes[] | null>(null);
  const [user, setUser] = useState<UserTypes[] | null>(null);

  const [tripViewOpen, setTripViewOpen] = useState(false);
  const [tripId, setTripId] = useState("");
  const [singleTrip, setsingleTrip] = useState<TripTypes>();

  const fetchTripFeed = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trip/get-feed`
      );
      const result = await res.json();
      setTripFeed(result.getTripFeed);
    } catch (error) {
      console.log("Trip feed fetch error", error);
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/public-user`
      );
      const result = await res.json();
      setUser(result.getPublicUser);
    } catch (error) {
      console.log("Trip feed fetch error", error);
    }
  };

  const fetchTripFeedById = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trip/get-feed/${tripId}`
      );
      const result = await res.json();
      setsingleTrip(result.getTripFeedById);
    } catch (error) {
      console.log("Trip feed fetch error", error);
    }
  };

  useEffect(() => {
    fetchTripFeed();
    getUser();
  }, []);

  useEffect(() => {
    fetchTripFeedById();
  }, [tripId]);

  return (
    <div className=" w-full flex flex-col py-15 justify-center items-center">
      <h1 className="text-2xl font-bold text-text-primary capitalize py-5">
        Latest Trip Feed
      </h1>
      <div className="w-full  md:w-full lg:w-[70%] flex flex-col lg:flex-row gap-3 flex-wrap justify-center items-center">
        {/* trip card */}
        {tripFeed &&
          tripFeed.map((trip) => (
            <div
              key={trip._id}
              className="w-full lg:w-5/12 px-3
                cursor-pointer"
              onClick={() => {
                setTripId(trip._id);
                setTripViewOpen(!tripViewOpen);
              }}
            >
              <div className=" w-full ">
                {/* Trip Header */}
                <div className="bg-gradient-to-r bg-primary-hover hover:bg-primary text-gray-100 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-all transform duration-300 ease-in ">
                  <h1 className="text-xl font-bold">{trip?.tripTitle}</h1>
                  <p className="mt-2 text-md font-medium ">
                    {trip?.currentLocation} → {trip?.tripLocation}
                  </p>
                  <p className="text-sm opacity-80 ">
                    {new Date(trip?.startDate as Date).toDateString()} –
                    {new Date(trip?.endDate as Date).toDateString()}
                  </p>
                  <div className="mt-3 flex justify-between gap-x-1 text-sm">
                    <p>Type: {trip?.tripType}</p>
                    <p>People: {trip?.numberOfPeople}</p>
                    <p className="col-span-2 text-red-200">
                      Visibility: {trip?.visibility ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="border-b-2 py-1 border-gray-200"></div>
                  <div className="w-full text-sm mt-1 flex justify-between ">
                    <p className="text-[12px] capitalize">
                      Created by:
                      <strong>
                        {user &&
                          user?.map(
                            (u) => u._id === trip.userId && ` ${u.firstName}`
                          )}
                      </strong>
                    </p>
                    <p className="text-[12px] capitalize">
                      updatedAt
                      <strong>
                        {user &&
                          user?.map(
                            (u) =>
                              u._id === trip.userId &&
                              ` ${new Date(
                                trip.updatedAt as Date
                              ).toLocaleDateString()}`
                          )}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {tripViewOpen && (
        <div className="fixed w-full shadow-2xl shadow-black rounded-lg max-h-full top-0 px-3 lg:p-6 backdrop-blur-3xl">
          <CgClose
            onClick={() => setTripViewOpen(!tripViewOpen)}
            className="absolute right-10  cursor-pointer text-white hover:text-gray-200 transition rounded-full bg-primary  p-2 "
            size={34}
            aria-label="Close trip view"
          />
          <div className="relative w-full mx-auto lg:p-16 space-y-6 top-10 overflow-scroll h-screen backdrop-blur-2xl ">
            {/* Trip Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <h1 className="text-3xl font-bold">{singleTrip?.tripTitle}</h1>
              <p className="mt-2 text-lg font-medium">
                {singleTrip?.currentLocation} → {singleTrip?.tripLocation}
              </p>
              <p className="text-sm opacity-80">
                {new Date(singleTrip?.startDate as Date).toDateString()} –{" "}
                {new Date(singleTrip?.endDate as Date).toDateString()}
              </p>
              <div className="mt-3 flex flex-col gap-y-1 text-sm">
                <p>Type: {singleTrip?.tripType}</p>
                <p>People: {singleTrip?.numberOfPeople}</p>
                <p className="col-span-2 text-red-200">
                  Visibility: {singleTrip?.visibility ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Trip Overview */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-xl mb-4 text-gray-800">
                Trip Overview
              </h2>
              <div className="space-y-3 text-gray-700">
                {singleTrip?.tripOverview?.map(
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
                {singleTrip?.dailyPlan?.map(
                  ({ day, title, activities }: DailyPlan, index: number) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg">{day}</h3>
                      <p className="text-gray-600 mb-1">{title}</p>
                      <ul className="list-disc ml-5 space-y-1 text-gray-700">
                        {activities.map((list: string, idx: number) => (
                          <li key={idx} className="text-justify">
                            {list}
                          </li>
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
              {singleTrip?.budgetBreakdown?.map(
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
                    <p className="text-justify">
                      <strong>Total Budget:</strong> {totalBudget}
                    </p>
                    <p className="text-justify">
                      <strong>Travel:</strong> {travel}
                    </p>
                    <p className="text-justify">
                      <strong>Accommodation:</strong> {accommodation}
                    </p>
                    <p className="text-justify">
                      <strong>Food:</strong> {food}
                    </p>
                    <p className="text-justify">
                      <strong>Activities & Transport:</strong>{" "}
                      {activitiesAndTransport}
                    </p>
                    <p className="text-justify">
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
              {singleTrip?.localTips?.map(
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
                    <p className="text-justify">
                      <strong>Currency:</strong> {currency}
                    </p>
                    <p className="text-justify">
                      <strong>Transport:</strong> {transport}
                    </p>
                    <p className="text-justify">
                      <strong>Shopping:</strong> {shopping}
                    </p>
                    <p className="text-justify">
                      <strong>Dress Code:</strong> {dressCode}
                    </p>
                    <p className="text-justify">
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
              {singleTrip?.summary?.map(
                (
                  { highlights, recommendation, extras }: Summary,
                  index: number
                ) => (
                  <div key={index} className="text-gray-700">
                    <h3 className="font-semibold text-lg">Highlights</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      {highlights.map((highlight: string, index: number) => (
                        <li key={index} className="text-justify">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <h3 className="mt-4 font-semibold text-lg">
                      Recommendation
                    </h3>
                    <p className="text-justify">{recommendation}</p>
                    <h3 className="mt-4 font-semibold text-lg">Extras</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      {extras.map((extra: string, idx: number) => (
                        <li key={idx} className="text-justify">
                          {extra}
                        </li>
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

export default TripFeed;
