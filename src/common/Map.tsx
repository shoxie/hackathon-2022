import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { places } from "@/lib/contants";
import DetailedCard from "./DetailedCard";

const Marker = ({ text }: { text: string; lat: number; lng: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute w-full p-2 text-white -translate-x-1/2 -top-14 -left-1/2 bg-secondary rounded-xl min-w-max"
      >
        <span className="text-xl font-bold">{text}</span>
      </div>
      {isOpen && (
        <div className="absolute w-80 p-2 text-white -translate-x-1/2 bg-white max-h-max bottom-[400%] -left-1/2 rounded-xl">
          <DetailedCard {...places[0]} isCame={false} />
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
  zoom: 11,
};
type Marker = {

    lat: number;
    lng: number;
    text: string;
  
}
type MapProps = {
  center?: {
    lat: number;
    lng: number;
  } | null;
  markers?: Marker[]
};

const Map = ({ center, markers }: MapProps) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      }}
      defaultCenter={center ?? config.center}
      defaultZoom={config.zoom}
    >
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          text={marker.text}
          lat={marker.lat}
          lng={marker.lng}
        />
      ))}
    </GoogleMapReact>
  );
};

export default Map;
