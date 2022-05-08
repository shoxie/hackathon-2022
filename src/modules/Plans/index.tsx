import { useRouter } from "next/router";
import { plans as mockPlans } from "@/lib/contants";
import Link from "next/link";
import { getAllPlans } from "@/services/api";
import { useEffect, useState } from "react";

import withTransition from "@/common/PageTransition";
import { Plan } from "@/store/type";

const UserPlans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[] | null>(null);

  useEffect(() => {
    getAllPlans().then((res) => {
      console.log(res);
      setPlans(res.data.plans);
    });
  }, []);

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
      <div className="py-10">
        <h1 className="text-3xl font-semibold">Danh sách các kế hoạch</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {plans?.map((plan) => (
          <div key={plan.id} className="text-center">
            <div
              style={{ backgroundImage: `url(${mockPlans[0].thumbnail})` }}
              className="bg-center bg-no-repeat bg-cover rounded-t-full min-h-96 h-96"
            />
            <div className="pt-5">
              <span className="text-2xl font-medium">{`${plan.name}`}</span>
            </div>
            <div className="pt-5">
              <span className="text-2xl font-medium text-gray-300">
                <span className="text-secondary">
                  {plan._count.PlanLocation}
                </span>{" "}
                địa điểm
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
