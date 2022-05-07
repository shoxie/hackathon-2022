import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { famousPlaces } from "@/lib/contants";

SwiperCore.use([Navigation]);

const FamousPlaces = () => {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const handleClick = (e: React.MouseEvent, direction: string) => {
    if (swiper) {
      switch (direction) {
        case "next":
          swiper.slideNext();
          break;
        case "prev":
          swiper.slidePrev();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex flex-row items-center justify-between mb-10">
        <div>
          <span className="text-3xl font-semibold">Địa danh nổi tiếng</span>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <button
            type="button"
            onClick={(e) => handleClick(e, "prev")}
            className="p-2 border rounded-full border-primary"
          >
            <BsChevronLeft className="text-xl text-primary" />
          </button>
          <button
            type="button"
            onClick={(e) => handleClick(e, "next")}
            className="p-2 border rounded-full border-primary"
          >
            <BsChevronRight className="text-xl text-primary" />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {famousPlaces.map((item, index) => (
          <SwiperSlide key={index} className="relative z-[1]">
            <div
              className="relative w-full bg-center bg-no-repeat bg-cover rounded-t-full h-96"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              <div className="absolute w-full text-center bottom-5">
                <span className="text-3xl font-semibold text-white">
                  {item.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FamousPlaces;
