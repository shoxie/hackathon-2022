import Map from "@/common/Map";
import withTransition from "@/common/PageTransition";
import { useAtom } from "jotai";
import { mapViewMarkerAtom } from "@/store";

const MapView = () => {
  const [markers] = useAtom(mapViewMarkerAtom);
  return (
    <div className="w-screen h-[70vh]">
      <Map markers={markers} />
    </div>
  );
};

export default withTransition(MapView);
