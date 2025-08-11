import Image from "next/image";
import Hero from "../../components/global/Hero";
import TripFeed from "../../components/global/TripFeed";

export default function Home() {
  return (
    <div className="w-full ">
      <Hero />
      <TripFeed />
    </div>
  );
}
