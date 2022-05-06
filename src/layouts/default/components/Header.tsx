/* eslint-disable react/function-component-definition */
import { motion, AnimateSharedLayout } from "framer-motion";
import React, { FC, useState } from "react";
import classNames from "classnames";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/router";

const menuItems = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Địa điểm",
    path: "/places",
  },
  {
    name: "Kế hoạch",
    path: "/plan",
  },
];

type LinkProps = {
  selected: boolean;
  text: string;
  onClick: () => void;
};

const Link: FC<LinkProps> = ({ selected, onClick, text }) => {
  return (
    <motion.div
      className={classNames(
        "relative font-medium flex items-center justify-center text-xl cursor-pointer",
        selected ? "text-primary" : "text-black"
      )}
      onClick={onClick}
      animate={{ opacity: selected ? 1 : 0.5 }}
    >
      {text}
      {selected && (
        <motion.div
          className={classNames(
            "absolute top-[103%] align-middle h-0.5 rounded-2xl w-3/4",
            selected ? "bg-secondary" : ""
          )}
          layoutId="underline"
        />
      )}
    </motion.div>
  );
};

const UndelinedLinks = () => {
  const [current, setCurrent] = useState(0);

  const router = useRouter();

  const onClick = (index: number) => {
    setCurrent(index);
    router.push(menuItems[index].path);
  };

  return (
    <div className="flex flex-row space-x-16">
      <AnimateSharedLayout>
        {menuItems.map((item, idx) => (
          <Link
            text={item.name}
            key={idx}
            selected={current === idx}
            onClick={() => onClick(idx)}
          />
        ))}
      </AnimateSharedLayout>
    </div>
  );
};

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleModalOpen = (state: boolean) => {
    setIsOpen(state);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-screen-xl py-10 mx-auto">
      <div className="flex flex-row items-center justify-between w-full">
        <button
          type="button"
          className="text-4xl font-bold font-Montserrat"
          onClick={() => router.push("/")}
        >
          <span className="text-primary">Travel</span>
          <span className="text-secondary">Flow.</span>
        </button>
        <UndelinedLinks />
        <PopoverPrimitive.Root onOpenChange={handleModalOpen}>
          <PopoverPrimitive.Trigger>
            <button
              type="button"
              className="py-2 font-bold text-white rounded-md font-Montserrat px-7 bg-secondary"
            >
              Đăng nhập
            </button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content>
            <div className="relative p-10 mt-5 bg-white border border-black rounded-lg w-80">
              <button
                type="button"
                className="absolute top-0 right-10"
                onClick={handleCloseModal}
              >
                <IoIosCloseCircle className="text-2xl text-primary" />
              </button>
              <div className="flex flex-col items-center space-y-5">
                <div>
                  <span className="text-2xl font-medium text-secondary">
                    Đăng nhập
                  </span>
                </div>
                <div className="flex flex-row items-center w-40 p-2 space-x-5 border border-black rounded-full">
                  <BsGoogle className="text-2xl" />
                  <span>Google</span>
                </div>
                <div className="flex flex-row items-center w-40 p-2 space-x-5 border border-black rounded-full">
                  <BsFacebook className="text-2xl" />
                  <span>Facebook</span>
                </div>
                <div>
                  <span>Quay lại</span>
                </div>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      </div>
    </div>
  );
}

export default Header;
