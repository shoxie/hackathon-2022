import { atom } from "jotai";
import { MarkerType } from "./type";

export const mapViewMarkerAtom = atom<MarkerType[] | []>([]);
