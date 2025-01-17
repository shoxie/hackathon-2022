import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

import Container from "./components/Container";
import Filter from "./components/Filter";
import Map from "@/common/Map";
import withTransition from "@/common/PageTransition";

import { getLocations } from "@/services/api/location";
import { Location, LocationPayload, MarkerType } from "@/store/type";

const Places = () => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [total_page, settotal_page] = useState(0);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [currentPos, setCurrentPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [page, onChange] = useState<number>(1);

  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    setIsQuerying(true);
    getLocations(search as string, page)
      .then((res) => {
        setLocations(res.data.locations);
        const markerData = res.data.locations.map((place) => ({
          lat: place.latitude,
          lng: place.longitude,
          text: place.name,
          locationId: place.id,
        }));
        settotal_page(res.data.total_page);
        setMarkers(markerData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsQuerying(false));
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
  }, [search, page]);
  useEffect(() => {
    setSearchText("");
  }, [page]);

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
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
      <div className="grid grid-cols-1 space-y-5 md:grid-cols-12 md:space-x-5 md:space-y-0">
        <div className="lg:col-span-3 md:col-span-4">
          <div className="w-full h-40 mb-5 overflow-hidden rounded-xl">
            <Map center={currentPos} markers={markers} />
          </div>
          <Filter />
        </div>
        <div className="lg:col-span-9 md:col-span-8">
          <Container
            locations={locations}
            page={page}
            onChange={onChange}
            total_page={total_page}
          />
        </div>
      </div>
    </div>
  );
};

export default withTransition(Places);
