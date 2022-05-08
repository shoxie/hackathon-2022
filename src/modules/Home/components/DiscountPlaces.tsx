import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CouponCard from "@/common/CouponCard";
import { discounts } from "@/lib/contants";

SwiperCore.use([Navigation]);

const DiscountPlaces = () => {
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
    <div className="py-10 pb-16 bg-quaternary">
      <div className="mx-auto max-w-screen-xl lg:px-0 px-5">
        <div className="flex flex-row items-center justify-between mb-10">
          <div>
            <span className="text-3xl font-semibold">Ưu đãi hấp dẫn</span>
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
          slidesPerView={3}
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
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {discounts.map((item, index) => (
            <SwiperSlide key={index} className="relative z-[1]">
              <CouponCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountPlaces;
