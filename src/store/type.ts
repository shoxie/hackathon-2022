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
};

export type NewPlanPayload = {
  name: string;
};
