import { Review } from "@/store/type";
import { AiTwotoneStar } from "react-icons/ai";
import StarRating from "./StarRating";

const mockData = {
  rating: 4.8,
  ratingCount: 1123,
  comments: [
    {
      id: 1,
      username: "Nguyen Van A",
      avatar: "https://picsum.photos/300/200",
      rating: 5,
      timestamp: "2020-01-01",
      place: "Vườn bách thú Đà Lạt",
      content:
        "Nhờ có TravelFlow mà mình vừa được du lịch ngắm cảnh, vừa đảm bảo an toàn cho gia đình. Bé nhà mình chưa tiêm vắc xin nên mình hơi đắn đo khi đi du lịch, nhưng may mà có TravelFlow, mình tránh được những nơi đông người mà còn thêm nhiều mã ưu đãi nữa. ",
    },
    {
      id: 2,
      username: "Nguyen Van A",
      avatar: "https://picsum.photos/300/200",
      rating: 2,
      timestamp: "2020-01-01",
      place: "Vườn bách thú Đà Lạt",
      content:
        "Nhờ có TravelFlow mà mình vừa được du lịch ngắm cảnh, vừa đảm bảo an toàn cho gia đình. Bé nhà mình chưa tiêm vắc xin nên mình hơi đắn đo khi đi du lịch, nhưng may mà có TravelFlow, mình tránh được những nơi đông người mà còn thêm nhiều mã ưu đãi nữa. ",
    },
  ],
};

type Props = {
  isSection: boolean;
  isProfilePage: boolean;
  data?: Review[] | null;
  locationName: string
};

const CommentSection = ({ isSection, isProfilePage, data, locationName }: Props) => {
  return (
    <div>
      <div className="py-5">
        <span className="text-3xl font-semibold">
          {isProfilePage ? "Đã đánh giá" : "Đánh giá"}
        </span>
      </div>
      <div>
        <div className="flex flex-row items-center space-x-1">
          <div className="flex flex-row items-center text-2xl text-yellow-400">
            <AiTwotoneStar />
            <span>{mockData.rating}</span>
          </div>
          <div>
            <span className="font-medium text-gray-300">
              ({mockData.ratingCount} đánh giá)
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-5 space-y-5">
        {data?.map((comment) => (
          <div key={comment.id} className="grid grid-cols-12 space-x-5">
            <div className="flex flex-col items-center justify-center col-span-1 space-y-5">
              {/* <div
                className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full"
                style={{ backgroundImage: `url(${comment.avatar})` }}
              /> */}
              <div>
                <span className="text-xl font-semibold">
                  {comment.user.name}
                </span>
              </div>
            </div>
            <div className="col-span-11 p-3 border border-black rounded-xl">
              <div className="flex flex-row items-center justify-between">
                <StarRating rating={comment.rating} />
                <div>
                  <span className="text-lg font-medium text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-400">
                  Đánh giá cho: {locationName}
                </span>
              </div>
              <div className="py-5">
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
