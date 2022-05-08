import DetailedCard from "@/common/DetailedCard";
import { useState, useEffect } from "react";
import { usePagination } from "@mantine/hooks";
import { PlaceProps, Location } from "@/store/type";
import { places } from "@/lib/contants";
import { getFavouriteLocations } from "@/services/api";
import NoHistoryBanner from "public/assets/no-history-banner.png";

const FavouriteView = () => {
  const [locations, setLocations] = useState<Location[] | null>(null);
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

  useEffect(() => {
    getFavouriteLocations().then((res) => {
      if (res.data.favorites) {
        setLocations(res.data.favorites);
      }
    });
  }, []);

  const loadMore = () => {
    pagination.setPage(page + 1);
  };

  if (locations?.length === 0 || !locations) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <div
            style={{ backgroundImage: `url(${NoHistoryBanner.src})` }}
            className="w-64 h-40 bg-center bg-no-repeat bg-cover"
          />
          <span className="text-xl font-semibold text-center text-gray-500">
            Bạn chưa tham quan địa điểm nào cả :(
          </span>
          <span className="font-medium text-gray-400">
            Chúng tôi sẽ gợi ý cho bạn một số điểm du lịch an toàn ở bên dưới.
          </span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        {locations?.map((place, index) => (
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
