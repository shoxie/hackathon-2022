import { AiTwotoneStar } from "react-icons/ai";

type Props = {
  background: string;
  content: string;
  rating: number;
  ratingCount: number;
  toCome: number;
  destinationType?: string;
};
const DetailedCard = (props: Props) => {

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
  
  return (
    <div className="p-3 border border-gray-300 rounded-lg">
      <div
        style={{
          backgroundImage: `url(${props.background})`,
        }}
        className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer"
      />
      <div className="flex flex-col pt-2 space-y-2">
        <div>
          <span className="text-lg font-medium text-black cursor-pointer hover:underline">{props.content}</span>
        </div>
        <div className="flex flex-row space-x-1 propss-center">
          <div className="flex flex-row text-yellow-400 propss-center">
            <AiTwotoneStar />
            <span>{props.rating}</span>
          </div>
          <div>
            <span className="text-black">({props.ratingCount})</span>
          </div>
        </div>
        <div className="flex flex-row space-x-5 text-sm text-gray-400 propss-center">
          <span>{getCountText(props.toCome)}</span>
          <span>{props.destinationType ?? ""}</span>
        </div>
        <div className="flex flex-row justify-between propss-end">
          <span className="text-gray-400">
            <span className="font-medium text-primary">{props.toCome}</span>{" "}
            người sẽ đến
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
