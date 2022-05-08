import HeroBanner from "./components/HeroBanner";
import DiscountPlaces from "./components/DiscountPlaces";
import ShouldGoPlaces from "./components/ShouldGoPlaces";
import HotPlaces from "./components/HotPlaces";
import FamousPlaces from "./components/FamousPlaces";

import withTransition from "@/common/PageTransition";
import { Location, LocationPayload } from "@/store/type";
import { getLocations } from "@/services/api/location";
import { useState, useEffect } from "react";

const Home = () => {
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res.data.locations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mb-20">
        <HeroBanner />
      </div>
      <div className="mb-20">
        <DiscountPlaces />
      </div>
      <div className="mb-20">
        <ShouldGoPlaces places={locations} />
      </div>
      <div className="mb-20">
        <HotPlaces places={locations} />
      </div>
      <div className="mb-20">
        <FamousPlaces />
      </div>
    </>
  );
};

export default withTransition(Home);
