import DetailedCard from "@/common/DetailedCard";

import { usePagination } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { places } from "@/lib/contants";
import classNames from "classnames";

import { Location, PlaceProps } from "@/store/type";

type Props = {
  locations?: Location[] | null;
};

const Container = ({ locations }: Props) => {
  const [page, onChange] = useState<number>(1);
  const [data, setData] = useState<PlaceProps[]>([]);
  const pagination = usePagination({
    total: places.length / 9,
    page,
    onChange,
  });

  useEffect(() => {
    setData(places.slice((page - 1) * 9, page * 9));
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2">
        {locations?.map((place, index) => (
          <DetailedCard key={index} {...place} isCame={false} />
        ))}
      </div>
      <div className="flex justify-end w-full pt-5">
        <div>
          {pagination.range.map((item, index) => {
            if (item !== "dots") {
              return (
                <button
                  key={index}
                  onClick={() => {
                    pagination.setPage(item as number);
                  }}
                  className={classNames(
                    "py-1 px-3 rounded-lg",
                    index === page - 1 ? "bg-primary text-white" : "bg-white"
                  )}
                >
                  {item}
                </button>
              );
            }
            return (
              // return dots
              <button key={index}>...</button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Container;
