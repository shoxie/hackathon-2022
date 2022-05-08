import { useRouter } from "next/router";
import { plans } from "@/lib/contants";
import Link from "next/link";
import { getAllPlans } from "@/services/api";
import { useEffect } from "react";

import withTransition from "@/common/PageTransition";

const UserPlans = () => {
  const router = useRouter();

  useEffect(() => {
    getAllPlans().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
      <div className="py-10">
        <h1 className="text-3xl font-semibold">Danh sách các kế hoạch</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="text-center">
            <div
              style={{ backgroundImage: `url(${plan.thumbnail})` }}
              className="bg-center bg-no-repeat bg-cover rounded-t-full min-h-96 h-96"
            />
            <div className="pt-5">
              <span className="text-2xl font-medium">{`${plan.name} ${plan.from}-${plan.to}`}</span>
            </div>
            <div className="pt-5">
              <span className="text-2xl font-medium text-gray-300">
                <span className="text-secondary">{plan.places.length}</span> địa
                điểm
              </span>
            </div>
            <div className="flex items-center justify-center pt-5">
              <Link href={`/plans/${plan.id}`} as={`/plans/${plan.id}`}>
                <a className="px-8 py-2 font-semibold text-white rounded-xl bg-secondary">
                  Xem chi tiết
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withTransition(UserPlans);
