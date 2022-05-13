import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import { places } from "@/lib/contants";
import DetailedCard from "./DetailedCard";
import { MapProps, MarkerType, Location } from "@/store/type";
import { getLocationById } from "@/services/api";

const Marker = ({ text, locationId }: MarkerType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!locationId) return;
    getLocationById(locationId).then((res) => setLocation(res.data));
  }, [locationId]);


  const getCountText = (count: number) => {
    if (count < 100) {
      return "Ít người";
    }
    if (count < 500) {
      return "Bình thường";
    }
    return `Quá tải`;
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute w-full p-2 text-white -translate-x-1/2 -top-10 -left-1/2 bg-secondary rounded-xl min-w-max"
      >
        <span className="font-bold text-md">{getCountText(location?.highIntendedPeople)}</span>
      </div>
      {isOpen && location && (
        <div className="absolute w-80 p-2 text-white -translate-x-1/2 bg-white max-h-max bottom-[400%] -left-1/2 rounded-xl">
          <DetailedCard {...location} isCame={false} />
        </div>
      )}
      <div className="w-4 h-4 rounded-full bg-primary" />
    </div>
  );
};
const config = {
  center: {
    lat: 10.8142,
    lng: 106.6438,
  },
  style: {
    width: "100%",
    height: "100%",
  },
  zoom: 11,
};

const Map = ({ center, markers }: MapProps) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      }}
      defaultCenter={center ?? config.center}
      defaultZoom={config.zoom}
      center={center ?? config.center}
    >
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          text={marker.text}
          lat={marker.lat}
          lng={marker.lng}
          locationId={marker.locationId}
        />
      ))}
    </GoogleMapReact>
  );
};

export default Map;
