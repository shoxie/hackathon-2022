import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { plans } from "@/lib/contants";
import { PlanProps } from "@/store/type";
import Link from "next/link";
import withTransition from "@/common/PageTransition";
import { AiTwotoneStar, AiOutlineDelete } from "react-icons/ai";
import Map from "@/common/Map";

const DetailedUserPlan = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanProps>(plans[0]);
  const [markers, setMarkers] = useState<
    {
      lat: number;
      lng: number;
      text: string;
    }[]
  >([]);
  const [selectedPlace, setSelectedPlace] = useState<number>(0);

  useEffect(() => {
    const planId = parseInt(router.query.id as string);
    const planData = plans.filter((plan) => plan.id === planId);
    setPlan(planData[0]);
    const markerData = planData[0]?.places.map((place) => ({
      lat: place.lat,
      lng: place.lng,
      text: place.name,
    }));
    if (planData[0]?.places.length > 0) {
      setSelectedPlace(0);
    }
    setMarkers(markerData);
  }, [router.query.id]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex flex-row items-center justify-between py-10">
        <h1 className="inline text-2xl font-semibold">
          Bạn có{" "}
          <h1 className="inline text-secondary">{plan?.places.length}</h1> địa
          điểm trong kế hoạch
        </h1>
        <div>
          <Link href="/places" passHref>
            <a className="px-4 py-2 font-medium border-2 rounded-lg text-secondary border-secondary hover:text-white hover:bg-secondary">
              Thêm địa điểm
            </a>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 space-x-10">
        <div className="flex flex-col w-full space-y-5 col-span-5">
          {plan?.places.map((place, idx) => (
            <div key={idx} className="flex flex-row items-center space-x-3" onClick={() => setSelectedPlace(idx)}>
              <div className="text-2xl font-semibold text-center text-secondary">
                <span className="block">{place.startTime}</span>
                <span className="block">{place.startDate}</span>
              </div>
              <div className="w-full p-3 border border-gray-600 rounded-xl">
                <div className="flex flex-row space-x-2">
                  <div
                    style={{ backgroundImage: `url(${place.thumbnail})` }}
                    className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg"
                  />
                  <div>
                    <div>
                      <span className="text-2xl font-semibold">
                        {place.name}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-row items-center space-x-1">
                        <div className="flex flex-row items-center text-lg text-yellow-400">
                          <AiTwotoneStar />
                          <span>{place.rating}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">
                            ({place.ratingCount} đánh giá)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between pt-3">
                  <div className="flex flex-row items-center space-x-3">
                    <div>
                      <span className="text-lg text-gray-400">
                        <span className="text-2xl text-secondary">
                          {place.toCome}
                        </span>{" "}
                        dự định đến
                      </span>
                    </div>
                    <div>
                      <span className="text-lg text-gray-400">
                        <span className="text-2xl text-secondary">
                          {place.willCome}
                        </span>{" "}
                        sẽ đến
                      </span>
                    </div>
                  </div>
                  <button type="button" className="p-2 border rounded-lg bg-primary hover:bg-white border-primary group">
                    <AiOutlineDelete className="text-xl text-white group-hover:text-primary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full rounded-xl overflow-hidden min-h-[50vh] col-span-7">
          <Map
            markers={markers}
            center={{
              lat: plan?.places[selectedPlace].lat,
              lng: plan?.places[selectedPlace].lng,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withTransition(DetailedUserPlan);
