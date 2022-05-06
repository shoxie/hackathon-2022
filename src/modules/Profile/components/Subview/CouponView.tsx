import CouponCard from "@/common/CouponCard";
import { discounts } from "@/lib/contants";
import { CouponProps } from "@/store/type";
import { useEffect, useState } from "react";
import { usePagination } from "@mantine/hooks";
import NoCouponBanner from "public/assets/no-coupon-banner.png";

const CouponView = () => {
  const [page, onChange] = useState<number>(1);
  const [data, setData] = useState<CouponProps[]>([]);
  const pagination = usePagination({
    total: discounts.length / 3,
    page,
    onChange,
  });

  useEffect(() => {
    setData(discounts.slice((page - 1) * 3, page * 3));
  }, [page]);

  const loadMore = () => {
    pagination.setPage(page + 1);
  };
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full pb-5 space-x-5">
        <div className="w-1/2">
          <input
            type="text"
            className="w-full py-2 pl-5 border border-gray-400 rounded-xl"
            placeholder="Nhập mã ưu đãi"
          />
        </div>
        <div>
          <button type="button" className="general-button">Sử dụng</button>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-3 gap-5">
          {data.slice(0, 3).map((discount, index) => (
            <CouponCard key={index} {...discount} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            style={{ backgroundImage: `url(${NoCouponBanner.src})` }}
            className="w-64 h-64 bg-center bg-no-repeat bg-cover"
          />
          <span className="text-xl font-semibold text-center text-gray-500">
            Bạn chưa tham quan địa điểm nào cả :(
          </span>
          <span className="font-medium text-gray-400">
            Chúng tôi sẽ gợi ý cho bạn một số điểm du lịch an toàn ở bên dưới.
          </span>
        </div>
      )}
      <div>
        <div className="pt-10 pb-3">
          <span className="text-2xl font-semibold">Khám phá thêm</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {discounts.map((discount, index) => (
            <CouponCard key={index} {...discount} />
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
      </div>
    </>
  );
};

export default CouponView;
