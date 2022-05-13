import { AiTwotoneStar, AiOutlinePlus, AiOutlineComment } from "react-icons/ai";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { fadeInUp } from "@/lib/contants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Location, Plan } from "@/store/type";
import SelectionBox from "./SelectionBox";
import { getAllPlans, createNewPlan, addLocationToPlan } from "@/services/api";
import classnames from "classnames";
import Calendar from "react-calendar";
import userService from "@/services/user";
import { useNotification } from "@/hooks/useNotification";
import { useRouter } from "next/router";

interface Props extends Location {
  isCame: boolean;
}

const DetailedCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState<boolean>(false);
  const [newPlanValue, setNewPlanValue] = useState<string>("");
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [date, setDate] = useState<Date>(new Date());
  const noti = useNotification();
  const router = useRouter();

  useEffect(() => {
    const user = userService.getUser();
    if (user) loadPlans();
  }, []);

  const loadPlans = () => {
    getAllPlans().then((res) => {
      setPlans(res.data.plans);
      if (res.data.plans.length > 0) {
        setSelectedPlanId(res.data.plans[0].id);
      }
    });
  };

  const getCountText = (count: number) => {
    if (count < 100) {
      return "Ít người";
    }
    if (count < 500) {
      return "Bình thường";
    }
    return `Quá tải`;
  };

  const handleOpenModal = (state: boolean) => {
    const user = userService.getUser();
    if (!user) {
      return noti.show({
        type: "error",
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
    }
    setIsOpen(state);
  };
  const onSelectPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "new") {
      setIsNewPlanOpen(true);
    } else {
      const id = parseInt(value);
      setSelectedPlanId(id);
    }
  };

  const handleCreateNewPlan = () => {
    if (newPlanValue) {
      createNewPlan({ name: newPlanValue }).then((res) => {
        setIsNewPlanOpen(false);
        loadPlans();
      });
    }
  };

  const handleAddToPlan = () => {
    if (!selectedPlanId) return;
    addLocationToPlan(selectedPlanId, props.id, date, numberOfPeople).then(
      (res) => {
        setIsOpen(false);
        noti.show({
          type: "success",
          message: "Thêm thành công",
        });
      }
    );
  };

  return (
    <>
      <div className="p-3 bg-white border border-gray-300 rounded-lg">
        <div
          style={{
            backgroundImage: `url(${props.thumbnail})`,
          }}
          className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer"
          onClick={() => router.push(`/places/${props.id}`)}
        />
        <div className="flex flex-col pt-2 space-y-2">
          <div>
            <Link href={`/places/${props.id}`} passHref>
              <a className="text-lg font-medium text-black cursor-pointer hover:underline lg:line-clamp-1">
                {props.name}
              </a>
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <div className="flex flex-row items-center text-yellow-400">
              <AiTwotoneStar />
              <span>{props.review.toFixed(1) ?? "TBD"}</span>
            </div>
            <div>
              <span className="text-gray-400">({props.review.toFixed(1)})</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-5 text-sm text-gray-400">
            <span>{getCountText(props.highIntendedPeople)}</span>
            <span>{""}</span>
          </div>
          <div className="flex flex-row items-end justify-between">
            <div>
              <span className="text-gray-400">
                <span className="font-medium text-primary">
                  {props.intendedPeople}
                </span>{" "}
                người dự định đến
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
                          <span className="text-primary">{props.name}</span> vào
                          kế hoạch
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-full space-x-5">
                        <label>Số lượng người đi</label>
                        <input
                          type="text"
                          className="pl-2 border focus:outline-none border-secondary rounded-xl"
                          onChange={(e) => setNewPlanValue(e.target.value)}
                        />
                      </div>
                      <div className="flex items-start justify-start w-full space-x-5">
                        <span>Thời điểm</span>
                        <Calendar onChange={setDate} value={date} />
                      </div>
                      <div className="flex items-center justify-center w-full space-x-5">
                        <span>Chọn kế hoạch của bạn</span>
                        <select
                          className="px-5 py-1 bg-transparent border rounded-xl focus:outline-none border-secondary"
                          onChange={onSelectPlanChange}
                        >
                          {plans?.length === 0 && <option value=""></option>}
                          {plans?.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name}
                            </option>
                          ))}
                          <option value="new">Tạo kế hoạch mới</option>
                        </select>
                      </div>
                      <div
                        className={classnames(
                          isNewPlanOpen ? "block" : "hidden"
                        )}
                      >
                        <div className="flex items-center justify-center w-full space-x-5">
                          <label>Tên kế hoạch mới</label>
                          <input
                            type="text"
                            className="pl-2 border focus:outline-none border-secondary rounded-xl"
                            onChange={(e) => setNewPlanValue(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center justify-center w-full pt-5 space-x-5">
                          <button
                            onClick={handleCreateNewPlan}
                            className="px-5 py-1 transition-all duration-300 border rounded-md border-secondary hover:bg-secondary hover:text-white text-secondary"
                          >
                            Tạo mới
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center space-x-10">
                        <button
                          onClick={() => handleOpenModal(false)}
                          className="px-5 py-1 transition-all duration-300 border rounded-md border-secondary hover:bg-secondary hover:text-white text-secondary"
                        >
                          Quay lại
                        </button>
                        <button
                          onClick={handleAddToPlan}
                          className="px-5 py-1 text-white transition-all duration-300 border rounded-md bg-secondary hover:bg-white hover:text-secondary border-secondary"
                        >
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
