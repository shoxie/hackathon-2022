import { atom } from "jotai";
import { MarkerType, UserInfo, Notification } from "./type";

export const mapViewMarkerAtom = atom<MarkerType[] | []>([]);

export const userAtom = atom<UserInfo | null>(null);

export const notificationAtom = atom<Notification[]>([])
