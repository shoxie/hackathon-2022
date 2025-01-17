import { useState, useEffect } from "react";
import { PlaceProps } from "@/store/type";
import NoHistoryBanner from "public/assets/no-history-banner.png";
import DetailedCard from "@/common/DetailedCard";
import { places } from "@/lib/contants";
import { usePagination } from "@mantine/hooks";
import { getLocations, getUserPlan, getLocationById } from "@/services/api";

import { Location } from "@/store/type";
//TODO: change api to real favourite locations

const HistoryView = () => {
  const [page, onChange] = useState<number>(1);
  const [data, setData] = useState<PlaceProps[]>([]);
  const pagination = usePagination({
    total: places.length / 6,
    page,
    onChange,
  });
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [recommendLocations, setRecommendLocations] = useState<
    Location[] | null
  >(null);

  useEffect(() => {
    getLocations()
      .then((res) => {
        setRecommendLocations(res.data.locations);
      })
      .catch((err) => {
        console.log(err);
      });
    getUserPlan().then((res) => {
      setData(res.data.plan_location);
      var temp: Location[] = [];
      for (let i = 0; i < res.data.plan_location.length; i++) {
        getLocationById(res.data.plan_location[i].id).then((res) => {
          temp.push(res.data);
        });
      }
      setLocations(temp);
    });
  }, []);

  useEffect(() => {
    setData(places.slice((page - 1) * 6, page * 6));
  }, [page]);

  const loadMore = () => {
    pagination.setPage(page + 1);
  };

  return (
    <>
      <div>
        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-5">
              {locations?.map((place, index) => (
                <DetailedCard key={index} {...place} isCame />
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
        ) : (
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
                Chúng tôi sẽ gợi ý cho bạn một số điểm du lịch an toàn ở bên
                dưới.
              </span>
            </div>
            <div>
              <div>
                <span className="text-2xl font-semibold">
                  Hoạt động nên thử
                </span>
              </div>
              <div className="grid grid-cols-3 gap-5 pt-5">
                {recommendLocations?.slice(0, 3).map((place, index) => (
                  <DetailedCard key={index} {...place} isCame={false} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HistoryView;
