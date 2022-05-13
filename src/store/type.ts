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
    lat: number;
    lng: number;
    appliedCoupons: CouponProps[];
  }[];
};

export type MarkerType = {
  lat: number;
  lng: number;
  text: string;
  locationId: number;
};
export type MapProps = {
  center?: {
    lat: number;
    lng: number;
  } | null;
  markers?: MarkerType[];
};

export type User = {
  email: string;
  password: string;
};

export type AuthPayload = {
  user: {
    id: number;
    email: string;
  };
  token: string;
};

export type LocationImage = {
  id: string;
  image_url: string;
  locationId: number;
};

export interface Location {
  id: number;
  name: string;
  thumbnail: string;
  address: string;
  latitude: number;
  longitude: number;
  highIntendedPeople: number;
  intendedPeople: number;
  review: number;
  LocationImages: LocationImage[];
}

export type LocationPayload = {
  current_page: number;
  total_page: number;
  locations: Location[];
  favorites?: Location[];
};

export type NewPlanPayload = {
  name: string;
};

export type Plan = {
  id: number;
  name: string;
  userId: number;
  _count: {
    PlanLocation: number;
  };
};

export type PlanLocation = {
  date: string;
  id: number;
  isVisited: boolean;
  locationId: number;
  numberOfPeople: number;
  planId: number;
};

export type UserInfo = {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string | null;
  reputationPoint: number;
};

export type Notification = {
  type: "success" | "error" | "loading";
  message: string;
};

export type Review = {
  id: number
  content: string
  locationId: number
  rating: number
  user: UserInfo
  userId: number
  createdAt: string
}