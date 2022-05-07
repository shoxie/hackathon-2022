import { AiTwotoneStar, AiOutlinePlus, AiOutlineComment } from "react-icons/ai";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { fadeInUp } from "@/lib/contants";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  background: string;
  content: string;
  rating: number;
  ratingCount: number;
  toCome: number;
  destinationType?: string;
  isCame: boolean;
};

const DetailedCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getCountText = (count: number) => {
    if (count > 100) {
      return "Ít người";
    }
    if (count > 500) {
      return "Bình thường";
    }
    if (count > 1000) {
      return `Quá tải`;
    }
  };

  const handleOpenModal = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <>
      <div className="p-3 bg-white border border-gray-300 rounded-lg">
        <div
          style={{
            backgroundImage: `url(${props.background})`,
          }}
          className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer"
        />
        <div className="flex flex-col pt-2 space-y-2">
          <div>
            <Link href="/places/detail" passHref>
              <a className="text-lg font-medium text-black cursor-pointer hover:underline">
                {props.content}
              </a>
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <div className="flex flex-row items-center text-yellow-400">
              <AiTwotoneStar />
              <span>{props.rating}</span>
            </div>
            <div>
              <span className="text-gray-400">({props.ratingCount})</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-5 text-sm text-gray-400">
            <span>{getCountText(props.toCome)}</span>
            <span>{props.destinationType ?? ""}</span>
          </div>
          <div className="flex flex-row items-end justify-between">
            <div>
              <span className="text-gray-400">
                <span className="font-medium text-primary">{props.toCome}</span>{" "}
                người sẽ đến
              </span>
            </div>
            <div>
              {props.isCame ? (
                <button
                  type="button"
                  className="p-2 border rounded-lg bg-tertiary group hover:bg-white hover:border-tertiary"
                >
                  <AiOutlineComment className="text-2xl text-white group-hover:text-tertiary" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenModal(true)}
                  className="p-2 border rounded-lg bg-primary hover:bg-white hover:border-primary group"
                >
                  <AiOutlinePlus className="text-2xl text-white group-hover:text-primary" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <DialogPrimitive.Root onOpenChange={handleOpenModal}>
        <AnimatePresence exitBeforeEnter>
          {isOpen ? (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild forceMount>
                <div className="fixed inset-0 z-[2] cursor-pointer bg-black/50 backdrop-blur-[10px]" />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild forceMount>
                <div className="fixed z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 70,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: 70,
                    }}
                    transition={{
                      delay: 0.3,
                    }}
                    className="z-[3] p-10 bg-center bg-no-repeat bg-cover px-14"
                  >
                    <div className="flex flex-col max-w-2xl p-10 space-y-10 bg-white rounded-md">
                      <div className="text-center">
                        <span className="text-2xl font-semibold text-secondary">
                          Thêm mã ưu đãi
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-semibold">
                          Thêm địa điểm{" "}
                          <span className="text-primary">{props.content}</span>{" "}
                          vào kế hoạch
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-center space-x-10">
                        <button className="px-5 py-1 transition-all duration-300 border rounded-md border-secondary hover:bg-secondary hover:text-white text-secondary">
                          Quay lại
                        </button>
                        <button className="px-5 py-1 text-white transition-all duration-300 border rounded-md bg-secondary hover:bg-white hover:text-secondary border-secondary">
                          Thêm
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          ) : null}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </>
  );
};

export default DetailedCard;
