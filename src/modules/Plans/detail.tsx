import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { plans } from "@/lib/contants";
import { PlanLocation, PlanProps, Location, MarkerType } from "@/store/type";
import Link from "next/link";
import withTransition from "@/common/PageTransition";
import { AiTwotoneStar, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import Map from "@/common/Map";
import classNames from "classnames";
import EmptyPlanBanner from "public/assets/empty-plan-banner.png";
import {
  getPlanById,
  getLocationById,
  markVisitedLocation,
} from "@/services/api";
import { useNotification } from "@/hooks/useNotification";

const DetailedUserPlan = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanProps>(plans[0]);
  const [planLocations, setPlanLocations] = useState<Location[] | []>([]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<number>(0);
  const [isMapView, setIsMapView] = useState<boolean>(false);

  const noti = useNotification();

  useEffect(() => {
    const planId = parseInt(router.query.id as string);
    if (!planId) return;
    getPlanById(planId).then(async (res) => {
      let temp: Location[] = [];
      for (let i = 0; i < res.data.PlanLocation.length; i++) {
        await getLocationById(res.data.PlanLocation[i].id).then((result) => {
          temp = [...temp, result.data];
        });
      }
      setPlanLocations(temp);
    });
  }, [router.query.id]);

  useEffect(() => {
    if (planLocations.length > 0) {
      const markerData = planLocations.map((place) => ({
        lat: place.latitude,
        lng: place.longitude,
        text: place.name,
        locationId: place.id,
      }));
      setSelectedPlace(0);
      setMarkers(markerData);
    }
  }, [planLocations]);

  if (planLocations.length === 0) {
    return (
      <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
        <div>
          <h1 className="inline text-2xl font-semibold">
            Bạn có{" "}
            <span className="inline text-secondary">
              {planLocations?.length}
            </span>{" "}
            địa điểm trong kế hoạch
          </h1>
          <div className="flex flex-col items-center justify-center w-full text-center">
            <div
              style={{ backgroundImage: `url(${EmptyPlanBanner.src})` }}
              className="h-48 mb-5 bg-center bg-no-repeat bg-cover w-96"
            />
            <span className="block text-3xl font-semibold text-gray-600">
              Bạn chưa thêm địa điểm nào vào danh sách!
            </span>
            <span className="block text-2xl font-medium text-gray-500">
              Hãy cùng chúng tôi khám phá các địa điểm du lịch an toàn cùng với
              các mã ưu đãi nào!
            </span>
          </div>
          <div className="flex items-center justify-center py-5">
            <Link href="/places" passHref>
              <a className="px-4 py-3 text-2xl font-medium text-white border-2 rounded-lg hover:text-secondary border-secondary bg-secondary">
                Khám phá
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-xl px-5 pb-10 mx-auto lg:px-0">
        <button
          onClick={() => setIsMapView(false)}
          className={classNames(
            "px-4 py-1 border text-primary border-primary hover:text-white hover:bg-primary rounded-lg",
            isMapView ? "block" : "hidden"
          )}
        >
          Quay lại
        </button>
      </div>
      <div
        className={classNames(
          "mx-auto max-w-screen-2xl lg:px-0 px-5",
          isMapView ? "hidden" : ""
        )}
      >
        <div className="flex flex-col items-center justify-between py-10 space-y-5 md:flex-row md:space-y-0">
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
        <div className="grid grid-cols-1 space-y-10 lg:space-y-0 lg:grid-cols-12 lg:space-x-10">
          <div className="flex flex-col w-full space-y-5 lg:col-span-5">
            {planLocations?.map((place, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center space-x-3 cursor-pointer"
                onClick={() => setSelectedPlace(idx)}
              >
                <div className="text-2xl font-semibold text-center text-secondary">
                  <span className="block">{""}</span>
                  <span className="block">{""}</span>
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
                            <span>{place.review}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-300">
                              ({place.review} đánh giá)
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
                            {place.intendedPeople}
                          </span>{" "}
                          dự định đến
                        </span>
                      </div>
                      <div>
                        <span className="text-lg text-gray-400">
                          <span className="text-2xl text-secondary">
                            {place.highIntendedPeople}
                          </span>{" "}
                          sẽ đến
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-5">
                      <button
                        type="button"
                        className="p-2 border rounded-lg bg-primary hover:bg-white border-primary group"
                        onClick={() => {
                          markVisitedLocation(
                            router.query.id as string,
                            place.id
                          ).then(() => {
                            noti.show({
                              type: "success",
                              message: "Đã đánh dấu đã đến",
                            });
                          });
                        }}
                      >
                        <AiOutlineCheck className="text-xl text-white group-hover:text-primary" />
                      </button>
                      <button
                        type="button"
                        className="p-2 border rounded-lg bg-primary hover:bg-white border-primary group"
                      >
                        <AiOutlineDelete className="text-xl text-white group-hover:text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full rounded-xl overflow-hidden min-h-[50vh] lg:col-span-7 relative">
            <Map
              markers={markers}
              center={{
                lat: planLocations[selectedPlace].latitude,
                lng: planLocations[selectedPlace].longitude,
              }}
            />
            <div className="absolute bottom-5 left-5">
              <button
                onClick={() => setIsMapView(true)}
                className="z-10 px-5 py-1 text-2xl font-semibold text-white bg-primary hover:text-primary hover:bg-white rounded-xl"
              >
                Mở map
              </button>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-12 space-x-10">
          <div className="col-span-5">
            <h2 className="py-10 text-3xl font-semibold">Chi tiết địa điểm</h2>
            <div className="flex flex-row py-5 space-x-5">
              <div
                style={{
                  backgroundImage: `url(${plan?.places[selectedPlace].thumbnail})`,
                }}
                className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg"
              />
              <div>
                <span className="block text-xl font-semibold">
                  {plan?.places[selectedPlace].name}
                </span>
                <div className="flex flex-row items-center space-x-1">
                  <div className="flex flex-row items-center text-yellow-400">
                    <AiTwotoneStar />
                    <span>{plan?.places[selectedPlace].rating}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      ({plan?.places[selectedPlace].ratingCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-5">
              <div>
                <span className="block text-xl font-medium text-gray-500">
                  Đi ngày{" "}
                  <span className="text-2xl font-semibold text-secondary">
                    {plan?.places[selectedPlace].startDate}
                  </span>
                </span>
                <span className="block text-xl font-medium text-gray-500">
                  <span className="text-2xl text-secondary">
                    {plan?.places[selectedPlace].toCome}
                  </span>{" "}
                  dự định đến
                </span>
              </div>
              <div>
                <span className="text-xl font-medium text-gray-500">
                  Số lượng{" "}
                  <span className="text-2xl font-semibold text-secondary">
                    {plan?.places[selectedPlace].members}
                  </span>{" "}
                  người
                </span>
                <span className="block text-xl font-medium text-gray-500">
                  <span className="text-2xl text-secondary">
                    {plan?.places[selectedPlace].willCome}
                  </span>{" "}
                  sẽ đến
                </span>
              </div>
            </div>
            <div>
              <span className="block py-5 text-2xl font-medium">
                Các mã ưu đãi đã thêm
              </span>
              <div className="grid grid-cols-2 gap-5">
                {plan?.places[selectedPlace].appliedCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    style={{
                      backgroundImage: `url(${plan?.places[selectedPlace].thumbnail})`,
                    }}
                    className="flex w-full h-32 bg-center bg-no-repeat bg-cover rounded-2xl"
                  >
                    <div className="pb-2 pl-3 mt-auto text-white">
                      <span className="text-xl font-medium">{coupon.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-7 w-full rounded-xl overflow-hidden min-h-[50vh] mt-20">
            <Map
              markers={[
                {
                  text: plan?.places[selectedPlace].name,
                  lat: plan?.places[selectedPlace].lat,
                  lng: plan?.places[selectedPlace].lng,
                },
              ]}
              center={{
                lat: plan?.places[selectedPlace].lat,
                lng: plan?.places[selectedPlace].lng,
              }}
            />
          </div>
        </div> */}
      </div>
      <div
        className={classNames(
          isMapView ? "block relative w-screen h-[80vh]" : "hidden"
        )}
      >
        <Map
          markers={markers}
          center={{
            lat: planLocations[selectedPlace].latitude,
            lng: planLocations[selectedPlace].longitude,
          }}
        />
        <div className="absolute max-w-xl bg-white h-3/4 top-5 left-5 rounded-xl">
          <div className="flex flex-col w-full h-full col-span-5 p-5 space-y-5 overflow-y-scroll">
            {planLocations?.map((place, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center space-x-3 cursor-pointer"
                onClick={() => setSelectedPlace(idx)}
              >
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
                            <span>{place?.review}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-300">
                              ({place?.review} đánh giá)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-center text-secondary">
                    {/* <span className="block">
                      {place.startTime} {place.startDate}
                    </span> */}
                  </div>
                  <div className="flex flex-row items-center justify-between pt-3">
                    <div className="flex flex-row items-center space-x-3">
                      <div>
                        <span className="text-lg text-gray-400">
                          <span className="text-2xl text-secondary">
                            {place.intendedPeople}
                          </span>{" "}
                          dự định đến
                        </span>
                      </div>
                      <div>
                        <span className="text-lg text-gray-400">
                          <span className="text-2xl text-secondary">
                            {place.highIntendedPeople}
                          </span>{" "}
                          sẽ đến
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="p-2 border rounded-lg bg-primary hover:bg-white border-primary group"
                    >
                      <AiOutlineDelete className="text-xl text-white group-hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default withTransition(DetailedUserPlan);
