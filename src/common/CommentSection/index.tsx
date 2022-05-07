import { AiTwotoneStar } from "react-icons/ai";
import StarRating from "./StarRating";

const data = {
  rating: 4.8,
  ratingCount: 1123,
  comments: [
    {
      id: 1,
      username: "Nguyen Van A",
      avatar: "https://i.picsum.photos/id/10/200/200.jpg",
      rating: 5,
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
};
const CommentSection = ({ isSection, isProfilePage }: Props) => {
  return (
    <div>
      <div>
        <span className="text-2xl font-semibold">
          {isProfilePage ? "Đã đánh giá" : "Đánh giá"}
        </span>
      </div>
      <div>
        <div className="flex flex-row items-center space-x-1">
          <div className="flex flex-row items-center text-yellow-400">
            <AiTwotoneStar />
            <span>{data.rating}</span>
          </div>
          <div>
            <span className="text-black">({data.ratingCount} đánh giá)</span>
          </div>
        </div>
      </div>
      <div>
        {data.comments.map((comment) => (
          <div key={comment.id} className="grid grid-cols-12">
            <div className="flex flex-col items-center col-span-2">
              <div
                className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full"
                style={{ backgroundImage: `url(${comment.avatar})` }}
              />
              <div>
                <span>{comment.username}</span>
              </div>
            </div>
            <div className="col-span-10">
              <div className="flex flex-row items-center justify-between">
                <StarRating rating={comment.rating} />
                <div>
                  <span>{comment.timestamp}</span>
                </div>
              </div>
              <div>
                <span>Đánh giá cho: {comment.place}</span>
              </div>
              <div>
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
