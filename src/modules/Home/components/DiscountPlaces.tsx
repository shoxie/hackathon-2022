import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Discount1 from "public/assets/discount-1.png";
import Discount2 from "public/assets/discount-2.png";
import Discount3 from "public/assets/discount-3.png";

const discounts = [
  {
    code: "F2469WER",
    content: "Hội An - Giảm 30% khi đi trong tuần",
    background: Discount1.src,
  },
  {
    code: "F2469WER",
    content: "Tặng 2 bữa tối miễn phí khi du lịch dưới 3 người",
    background: Discount2.src,
  },
  {
    code: "F2469WER",
    content: "Thám hiểm rừng sâu - Hỗ trợ cắm trại miễn phí",
    background: Discount3.src,
  },
  {
    code: "F2469WER",
    content: "Tặng 2 bữa tối miễn phí khi du lịch dưới 3 người",
    background: Discount2.src,
  },
];
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
    <div>
      <div className="flex flex-row items-center justify-between mb-5">
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
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {discounts.map((item, index) => (
          <SwiperSlide key={index} className="relative z-[1]">
            <div
              style={{
                backgroundImage: `url(${item.background})`,
              }}
              className="flex flex-col items-start justify-between w-full h-40 p-5 bg-center bg-no-repeat bg-cover cursor-pointer rounded-xl relative z-[1]"
            >
              <div>
                <span className="text-xl font-semibold text-white">
                  {item.code}
                </span>
              </div>
              <div>
                <span className="text-lg text-white">{item.content}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountPlaces;
