import { CouponProps } from "@/store/type";

const CouponCard = (props: CouponProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.background})`,
      }}
      className="flex flex-col items-start justify-between w-full h-40 p-5 bg-center bg-no-repeat bg-cover cursor-pointer rounded-xl relative z-[1]"
    >
      <div>
        <span className="text-xl font-semibold text-white">{props.code}</span>
      </div>
      <div>
        <span className="text-lg text-white">{props.content}</span>
      </div>
    </div>
  );
};

export default CouponCard;
