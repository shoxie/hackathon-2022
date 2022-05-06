import HeroBanner from "./components/HeroBanner";
import DiscountPlaces from "./components/DiscountPlaces";
import ShouldGoPlaces from "./components/ShouldGoPlaces";
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

export default Home;
