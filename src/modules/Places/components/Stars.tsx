import ReactStars from "react-stars";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <ReactStars
      count={5}
      value={rating}
      edit={false}
      color2={"#ffd700"}
      color1={"transparent"}
      size={24}
    />
  );
}
