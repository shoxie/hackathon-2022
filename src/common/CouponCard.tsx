import { CouponProps } from "@/store/type";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/contants";

const CouponCard = (props: CouponProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <>
      <DialogPrimitive.Root onOpenChange={handleOpenModal}>
        <DialogPrimitive.Trigger asChild className="relative">
          <motion.button
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="w-full"
          >
            <div
              style={{
                backgroundImage: `url(${props.background})`,
              }}
              className="flex flex-col items-start justify-between w-full h-40 p-5 bg-center bg-no-repeat bg-cover cursor-pointer rounded-xl relative z-[1]"
            >
              <div>
                <span className="text-xl font-semibold text-white">
                  {props.code}
                </span>
              </div>
              <div>
                <span className="text-lg text-white">{props.content}</span>
              </div>
            </div>
          </motion.button>
        </DialogPrimitive.Trigger>
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
                      <div
                        style={{
                          backgroundImage: `url(${props.background})`,
                        }}
                        className="flex flex-col items-start justify-between w-full h-40 p-5 bg-center bg-no-repeat bg-cover cursor-pointer rounded-xl relative z-[1]"
                      >
                        <div>
                          <span className="text-xl font-semibold text-white">
                            {props.code}
                          </span>
                        </div>
                        <div>
                          <span className="text-lg text-white">
                            {props.content}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between space-x-5">
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

export default CouponCard;
