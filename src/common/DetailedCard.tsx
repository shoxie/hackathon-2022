import { AiTwotoneStar, AiOutlinePlus, AiOutlineComment } from "react-icons/ai";
import Link from "next/link";

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
            <span className="text-black">({props.ratingCount})</span>
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
                className="p-2 border rounded-lg bg-primary hover:bg-white hover:border-primary group"
              >
                <AiOutlinePlus className="text-2xl text-white group-hover:text-primary" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
