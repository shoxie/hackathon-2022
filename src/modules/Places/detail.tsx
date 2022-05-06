import {
  AiTwotoneStar,
  AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";

import ImageCarouselLightBox from "./components/ImageCarouselLightBox";
import LineGraph from "./components/LineGraph";

import classNames from "classnames";
import { useState } from "react";
import { lineChartData, lineChartData1Week } from "@/lib/contants";

const data = {
  name: "Vườn bách thú Đà Lạt",
  rating: 4.8,
  ratingCount: 1123,
  capacity: 5400,
  toComeCapacity: 2297,
  willComeCapacity: 554,
};

const graphFilterOptions = [
  {
    id: 0,
    name: "48h",
  },
  {
    id: 1,
    name: "7 ngày",
  },
  {
    id: 2,
    name: "30 ngày",
  },
  {
    id: 3,
    name: "90 ngày",
  },
];

const PlaceDetail = () => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);

  const getChartData = () => {
    switch (currentFilterIndex) {
      case 0:
        return lineChartData;
      case 1:
        return lineChartData1Week;
      default:
        return lineChartData;
    }
  };

  const getLabel = () => {
    switch (currentFilterIndex) {
      case 0:
        return "48h";
      case 1:
        return "7 ngày";
      case 2:
        return "30 ngày";
      case 3:
        return "90 ngày";
      default:
        return "48h";
    }
  };
  return (
    <>
      <ImageCarouselLightBox />
      <div className="flex flex-col space-y-5">
        <div>
          <h1 className="text-3xl font-semibold">{data.name}</h1>
        </div>
        <div>
          <div className="flex flex-row items-center space-x-1">
            <div className="flex flex-row items-center text-yellow-400">
              <AiTwotoneStar />
              <span>{data.rating}</span>
            </div>
            <div>
              <span className="text-black">({data.ratingCount} đánh giá)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>
            <span className="text-2xl font-semibold">
              Chứa tối đa{" "}
              <span className="text-secondary">{data.capacity}</span> người
            </span>
          </div>
          <div className="flex items-center space-x-3 text-2xl font-semibold">
            <AiOutlineHeart />
            <span>Yêu thích</span>
          </div>
        </div>
        <div>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &apos;Content here,
            content here &apos;, making it look like readable English ....
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-row items-center justify-center space-x-40 text-gray-400 bg-quaternary max-w-max">
            <div className="p-20 text-center">
              <span className="text-2xl font-semibold">
                <span className="text-secondary">{data.toComeCapacity}</span>
                <br />
                số người dự định đến
              </span>
            </div>
            <div className="p-20 text-center">
              <span className="text-2xl font-semibold">
                <span className="text-secondary">{data.willComeCapacity}</span>
                <br />
                số người ít nhất sẽ đến
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="flex flex-row items-center space-x-5">
          {graphFilterOptions.map((item, index) => (
            <button
              type="button"
              key={index}
              className={classNames(
                "w-28 border border-secondary rounded-lg py-2 px-6",
                currentFilterIndex === index
                  ? "bg-secondary text-white"
                  : "text-secondary"
              )}
              onClick={() => setCurrentFilterIndex(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="h-[50vh] my-5">
          <LineGraph data={getChartData()} />
        </div>

        <div className="text-center">
          <span className="text-2xl italic font-semibold text-gray-400">
            Thống kê dòng người du lịch trong {getLabel()} vừa qua
          </span>
        </div>
      </div>
    </>
  );
};

export default PlaceDetail;
