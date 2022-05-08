import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

import Container from "./components/Container";
import Filter from "./components/Filter";
import Map from "@/common/Map";
import withTransition from "@/common/PageTransition";

import { getLocations } from "@/services/api/location";
import { Location, LocationPayload } from "@/store/type";

const Places = () => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [currentPos, setCurrentPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [locations, setLocations] = useState<Location[] | null>(null);

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
      getLocations()
        .then((res) => {
          console.log(res.data);
          setLocations(res.data.locations);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

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
            <Map
              center={currentPos}
              markers={[{ lat: 10.8142, lng: 106.6438, text: "My Marker" }]}
            />
          </div>
          <Filter />
        </div>
        <div className="lg:col-span-9 md:col-span-8">
          <Container locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default withTransition(Places);
