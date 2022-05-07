import { AiTwotoneStar, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import {
  IoSearchSharp,
  IoCalendarNumberOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import ImageCarouselLightBox from "./components/ImageCarouselLightBox";
import LineGraph from "./components/LineGraph";
import CommentSection from "@/common/CommentSection";

import classNames from "classnames";
import { useState } from "react";
import { lineChartData, lineChartData1Week } from "@/lib/contants";
import Calendar from "react-calendar";

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
  const [searchText, setSearchText] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

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

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCalendarOpen = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <ImageCarouselLightBox />
      <div className="flex flex-col space-y-10">
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
          <p className="text-lg">
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
      <div className="flex items-center justify-center">
        <div className="flex flex-row items-center justify-center p-6 space-x-10 bg-white shadow-lg max-w-max bg-opacity-80 rounded-2xl">
          <div className="flex flex-row w-full space-x-3">
            <div className="mt-1">
              <IoCalendarNumberOutline className="text-2xl" />
            </div>
            <div className="flex flex-col items-start">
              <div>
                <span className="text-xl font-medium">Ngày khởi hành</span>
              </div>
              <div className="relative z-[2]">
                <button
                  className="text-sm font-medium text-gray-500"
                  onClick={handleCalendarOpen}
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Chọn ngày đi nào"}
                </button>
                {isCalendarOpen && (
                  <div className="absolute top-full">
                    <Calendar
                      onChange={(date: Date) => {
                        setIsCalendarOpen(false);
                        setSelectedDate(date);
                      }}
                      value={selectedDate}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-3">
            <div className="mt-1">
              <IoPeopleOutline className="text-2xl" />
            </div>
            <div className="flex flex-col items-start">
              <div>
                <span className="text-xl font-medium">Số lượng</span>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full text-sm font-medium text-gray-500 bg-transparent focus:outline-none"
                  placeholder="Bạn đồng hành cùng"
                  onChange={onSearchTextChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10">
        <button className="flex items-center space-x-3 general-button">
          <AiOutlinePlus className="text-2xl" />
          <span className="text-2xl">Thêm vào kế hoạch</span>
        </button>
      </div>
      <div>
        <CommentSection />
      </div>
    </div>
  );
};

export default PlaceDetail;
