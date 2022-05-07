export type PlaceProps = {
  code: string;
  content: string;
  background: string;
  rating: number;
  ratingCount: number;
  toCome: number;
  destinationType?: string;
};

export type CouponProps = {
  code: string;
  content: string;
  background: string;
};

export type PlanProps = {
  id: number;
  thumbnail: string;
  name: string;
  from: string;
  to: string;
  places: {
    name: string;
    thumbnail: string;
    startTime: string;
    startDate: string;
    members: number;
    rating: number;
    ratingCount: number;
    toCome: number;
    willCome: number;
    lat: number
    lng: number
    appliedCoupons: CouponProps[];
  }[];
};
