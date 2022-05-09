import { useState } from "react";
import classNames from "classnames";
import { AnimateSharedLayout, motion } from "framer-motion";

import { HiOutlineLocationMarker, HiOutlineHeart } from "react-icons/hi";
import { RiCoupon2Line, RiCoinLine } from "react-icons/ri";
import { AiOutlineComment } from "react-icons/ai";
import UserPlaceholder from "../../../public/assets/user.png";

import HistoryView from "./components/Subview/HistoryView";
import FavouriteView from "./components/Subview/FavouriteView";
import CouponView from "./components/Subview/CouponView";
import TrustView from "./components/Subview/TrustView";
import withTransition from "@/common/PageTransition";

import { useAtom } from "jotai";
import { userAtom } from "@/store";

const tabs = [
  {
    id: 0,
    name: "Địa điểm đã đến",
    icon: <HiOutlineLocationMarker />,
  },
  {
    id: 1,
    name: "Yêu thích",
    icon: <HiOutlineHeart />,
  },

  {
    id: 2,
    name: "Mã ưu đãi",
    icon: <RiCoupon2Line />,
  },

  {
    id: 3,
    name: "Uy tín",
    icon: <RiCoinLine />,
  },

  {
    id: 4,
    name: "Đánh giá",
    icon: <AiOutlineComment />,
  },
];

const SwitchTab = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <HistoryView />;
    case 1:
      return <FavouriteView />;
    case 2:
      return <CouponView />;
    case 3:
      return <TrustView />;
    default:
      return <></>;
  }
};

const UserProfile = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [user] = useAtom(userAtom);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-12 space-x-10">
        <div className="col-span-3">
          <div className="border border-gray-400 rounded-xl">
            <div className="flex flex-row items-center justify-start py-2 pl-10 space-x-5">
              <div
                className="w-12 h-12 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${UserPlaceholder.src})` }}
              />
              <div className="flex flex-col items-start">
                <span>Username</span>
                <span>{user?.email}</span>
              </div>
            </div>
            <div className="flex flex-col">
              {tabs.map((item) => (
                <button
                  type="button"
                  onClick={() => setCurrentTab(item.id)}
                  key={item.id}
                  className={classNames(
                    "flex flex-row items-center justify-start py-2 pl-10 w-full",
                    item.id === currentTab
                      ? "text-white bg-secondary"
                      : "text-black"
                  )}
                >
                  <div
                    className={classNames(
                      "flex flex-row items-center justify-center space-x-3 text-lg",
                      item.id === currentTab ? "font-semibold" : "font-normal"
                    )}
                  >
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-full col-span-9">
          <SwitchTab index={currentTab} />
        </div>
      </div>
    </div>
  );
};

export default withTransition(UserProfile);
