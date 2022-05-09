import { atom } from "jotai";
import { MarkerType, UserInfo } from "./type";

export const mapViewMarkerAtom = atom<MarkerType[] | []>([]);

export const userAtom = atom<UserInfo | null>(null);
