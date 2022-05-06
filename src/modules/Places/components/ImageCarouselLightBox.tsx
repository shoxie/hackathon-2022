import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { images } from "@/lib/contants";
import Lightbox from "react-image-lightbox";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

SwiperCore.use([Navigation]);

const ImageCarouselLightBox = () => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

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
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="relative z-[1]">
            <div
              style={{ backgroundImage: `url(${item})` }}
              className="lg:h-[50vh] lg:min-h-[50vh] bg-cover bg-center bg-no-repeat rounded-xl cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-row items-center justify-center py-5 space-x-3">
        <button
          type="button"
          onClick={(e) => handleClick(e, "prev")}
          className="p-1 transition-all duration-300 border rounded-full border-primary group hover:bg-primary"
        >
          <BsChevronLeft className="text-xl text-primary group-hover:text-white" />
        </button>
        <div>
          <span className="text-lg font-medium text-primary">Lướt xem</span>
        </div>
        <button
          type="button"
          onClick={(e) => handleClick(e, "next")}
          className="p-1 transition-all duration-300 border rounded-full border-primary group hover:bg-primary"
        >
          <BsChevronRight className="text-xl text-primary group-hover:text-white" />
        </button>
      </div>
      {isLightboxOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default ImageCarouselLightBox;
