import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

import Container from "./components/Container";
import Filter from "./components/Filter";
import Map from "@/common/Map";
import withTransition from "@/common/PageTransition";

const Places = () => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [currentPos, setCurrentPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    if (search) {
      setIsQuerying(true);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setCurrentPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.log("Not Available");
      }
    }
  }, [search]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex justify-center">
        <div className="relative w-3/4">
          <div className="absolute top-2.5 left-5">
            <AiOutlineSearch className="text-2xl text-primary" />
          </div>
          <input
            type="text"
            className="w-full p-2 pl-16 border-2 rounded-full border-primary"
            placeholder="Tìm kiếm địa điểm, món ăn, cảnh vật"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/places?search=${searchText}`);
              }
            }}
          />
        </div>
      </div>
      <div className="py-7">
        <span className="text-3xl font-semibold">
          {isQuerying ? `Hoạt động khợp với ${search}` : "Các địa điểm gần bạn"}
        </span>
      </div>
      <div className="grid grid-cols-12 space-x-5">
        <div className="col-span-3">
          <div className="w-full h-40 mb-5 overflow-hidden rounded-xl">
            <Map
              center={currentPos}
              markers={[{ lat: 10.8142, lng: 106.6438, text: "My Marker" }]}
            />
          </div>
          <Filter />
        </div>
        <div className="col-span-9">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default withTransition(Places);
