import HeroBanner from "./components/HeroBanner";
import DiscountPlaces from "./components/DiscountPlaces";
import ShouldGoPlaces from "./components/ShouldGoPlaces";
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
      <ShouldGoPlaces />
    </>
  );
};

export default withTransition(Home);
