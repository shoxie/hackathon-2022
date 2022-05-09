import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { famousPlaces } from "@/lib/contants";
import { useRouter } from "next/router";

SwiperCore.use([Navigation]);

const FamousPlaces = () => {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const router = useRouter();

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

  const navigate = (path: string) => {
    router.push(`/places?search=${path}`);
  };

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
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
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {famousPlaces.map((item, index) => (
          <SwiperSlide key={index} className="relative z-[1]">
            <div
              className="relative w-full bg-center bg-no-repeat bg-cover rounded-t-full cursor-pointer h-96"
              style={{ backgroundImage: `url(${item.background})` }}
              onClick={() => navigate(item.name)}
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
