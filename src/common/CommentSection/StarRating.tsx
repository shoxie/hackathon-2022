import ReactStars from "react-stars";

export default function StarRating({ rating }: { rating: number }) {
    const getRatingText = () => {
        if (rating <= 1) {
            return "Không thích";
        } else if (rating <= 2) {
            return "Tạm được";
        } else if (rating <= 3) {
            return "Bình thường";
        } else if (rating <= 4) {
            return "Tốt";
        } else {
            return "Rất tốt";
        }
    }
  return (
    <div className="flex flex-row items-center space-x-5">
      <ReactStars
        count={5}
        value={rating}
        edit={false}
        color2={"#ffd700"}
        color1={"transparent"}
        size={24}
      />
      <span>{getRatingText()}</span>
    </div>
  );
}
