import DetailedCard from "@/common/DetailedCard";
import { useState, useEffect } from "react";
import { usePagination } from "@mantine/hooks";
import { PlaceProps } from "@/store/type";
import { places } from "@/lib/contants";

const FavouriteView = () => {
  const [page, onChange] = useState<number>(1);
  const [data, setData] = useState<PlaceProps[]>([]);
  const pagination = usePagination({
    total: places.length / 6,
    page,
    onChange,
  });

  useEffect(() => {
    setData(places.slice((page - 1) * 6, page * 6));
  }, [page]);

  const loadMore = () => {
    pagination.setPage(page + 1);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        {data.map((place, index) => (
          <DetailedCard key={index} {...place} isCame={false} />
        ))}
      </div>
      <div className="flex items-center justify-center pt-5">
        <button
          type="button"
          onClick={loadMore}
          className="px-4 py-2 text-white transition-all duration-500 rounded-lg bg-primary hover:bg-white hover:border hover:border-primary hover:text-primary"
        >
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default FavouriteView;
