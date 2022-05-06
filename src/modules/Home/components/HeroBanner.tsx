import HeroBackground from "public/assets/herobg.png";
import { GoLocation } from "react-icons/go";
import {
  IoSearchSharp,
  IoCalendarNumberOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";

const HeroBanner = () => {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const onSearch = () => {
    router.push(`/places?search=${searchText}`);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  
  return (
    <div>
      <div
        className="bg-cover bg-no-repeat bg-center lg:h-[50vh] lg:max-h-[50vh] rounded-xl relative"
        style={{ backgroundImage: `url(${HeroBackground.src})` }}
      >
        <div className="pt-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Du lịch 4.0
              <br />
              An toàn - Hiện đại - Tiện lợi
            </h1>
          </div>
        </div>
        <div className="absolute -translate-x-1/2 -bottom-10 left-1/2">
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center justify-center max-w-full p-6 space-x-16 bg-white shadow-2xl rounded-xl">
              <div className="flex flex-row w-full space-x-3">
                <div className="mt-1">
                  <GoLocation className="text-2xl" />
                </div>
                <div className="flex flex-col items-start">
                  <div>
                    <span className="text-xl font-medium">Địa điểm</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-11/12 text-xs font-medium text-gray-500 focus:outline-none"
                      placeholder="Nơi bạn muốn đến"
                      onChange={onSearchTextChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full space-x-3">
                <div className="mt-1">
                  <IoCalendarNumberOutline className="text-2xl" />
                </div>
                <div className="flex flex-col items-start">
                  <div>
                    <span className="text-xl font-medium">Ngày</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">
                      Chọn ngày đi nào
                    </span>
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
                    <span className="text-xs font-medium text-gray-500">
                      Bạn đồng hành cùng
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button className="p-4 bg-primary rounded-xl" onClick={onSearch}>
                  <IoSearchSharp className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
