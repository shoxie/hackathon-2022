import { AiTwotoneStar, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import {
  IoSearchSharp,
  IoCalendarNumberOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import ImageCarouselLightBox from "./components/ImageCarouselLightBox";
import LineGraph from "./components/LineGraph";
import CommentSection from "@/common/CommentSection";
import CouponCard from "@/common/CouponCard";

import classNames from "classnames";
import { discounts, lineChartData, lineChartData1Week } from "@/lib/contants";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { Location } from "@/store/type";
import { useRouter } from "next/router";
import { getLocationById, getLocationGraphData } from "@/services/api/location";

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
    name: "Giờ",
  },
  {
    id: 1,
    name: "Tuần",
  },
  {
    id: 2,
    name: "Tháng",
  },
];

const PlaceDetail = () => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [detail, setDetail] = useState<Location | null>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const router = useRouter();

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
        return "giờ qua";
      case 1:
        return "tuần qua";
      case 2:
        return "tháng qua";
      default:
        return "giờ qua";
    }
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCalendarOpen = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const parseGraphObject = (data: any) => {
    const temp = data.x.map((item: string, index: number) => {
      return {
        name: new Date(item).toLocaleDateString("vi-VN"),
        pv: data.intended[index],
        uv: data.reality[index],
      };
    });
    setGraphData(temp);
  };

  useEffect(() => {
    const id = router.query.id as string;
    if (!id) return;
    getLocationById(id).then((res) => {
      setDetail(res.data);
    });
    getLocationGraphData(id, "hour").then((res) => {
      parseGraphObject(res.data);
    });
  }, [router.query.id]);

  useEffect(() => {
    let filter;
    switch (currentFilterIndex) {
      case 0:
        filter = "hour";
        break;
      case 1:
        filter = "week";
        break;
      case 2:
        filter = "month";
        break;
      default:
        filter = "hour";
        break;
    }
    getLocationGraphData(router.query.id as string, filter).then((res) => {
      parseGraphObject(res.data);
    });
  }, [currentFilterIndex]);

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
      <ImageCarouselLightBox images={detail?.LocationImages} />
      <div className="flex flex-col space-y-10">
        <div>
          <h1 className="text-3xl font-semibold">{detail?.name}</h1>
        </div>
        <div>
          <div className="flex flex-row items-center space-x-1">
            <div className="flex flex-row items-center text-yellow-400">
              <AiTwotoneStar />
              <span>{detail?.review}</span>
            </div>
            <div>
              <span className="text-black">({detail?.review} đánh giá)</span>
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
          <div className="flex flex-row items-center justify-center space-x-5 text-gray-400 lg:space-x-40 md:space-x-20 bg-quaternary max-w-max">
            <div className="p-5 text-center md:p-20">
              <span className="text-xl font-semibold md:text-2xl">
                <span className="text-secondary">{detail?.intendedPeople}</span>
                <br />
                số người dự định đến
              </span>
            </div>
            <div className="p-5 text-center md:p-20">
              <span className="text-xl font-semibold md:text-2xl">
                <span className="text-secondary">
                  {detail?.highIntendedPeople}
                </span>
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
          <LineGraph data={graphData} />
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
      <div className="py-10">
        <div>
          <span className="text-3xl font-semibold">Thêm các mã giảm giá</span>
        </div>
        <div className="grid grid-cols-3 gap-5 py-10">
          {discounts.slice(0, 3).map((item, index) => (
            <CouponCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div>
        <CommentSection isSection isProfilePage={false} />
      </div>
    </div>
  );
};

export default PlaceDetail;
