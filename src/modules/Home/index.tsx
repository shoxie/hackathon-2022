import HeroBanner from "./components/HeroBanner";
import DiscountPlaces from "./components/DiscountPlaces";
import ShouldGoPlaces from "./components/ShouldGoPlaces";
import HotPlaces from "./components/HotPlaces";
import FamousPlaces from "./components/FamousPlaces";

import withTransition from "@/common/PageTransition";

const Home = () => {
  return (
    <>
      <div className="mb-20">
        <HeroBanner />
      </div>
      <div className="mb-20">
        <DiscountPlaces />
      </div>
      <div className="mb-20">
        <ShouldGoPlaces />
      </div>
      <div className="mb-20">
        <HotPlaces />
      </div>
      <div className="mb-20">
        <FamousPlaces />
      </div>
    </>
  );
};

export default withTransition(Home);
