import { useAtom } from "jotai";
import { useCallback } from "react";
import update from "immutability-helper";
import { notificationAtom } from "@/store";
import { Notification } from "@/store/type";

export const useNotification = () => {
  const [notis, setNotis] = useAtom(notificationAtom);

  const show = useCallback(
    (notification: Notification) => {
      const newList = update(notis, {
        $push: [notification],
      });
      setNotis(newList);
      return newList.length - 1;
    },
    [notis, setNotis]
  );

  const clear = useCallback(() => {
    // keep only loading type
    setNotis(notis.filter((noti) => noti.type === "loading"));
  }, [notis, setNotis]);

  const updateNoti = useCallback(
    (id: number, updateInfo: Notification) => {
      setNotis(
        update(notis, {
          [id]: {
            $set: updateInfo,
          },
        })
      );
    },
    [notis, setNotis]
  );

  return {
    show,
    clear,
    notis,
    update: updateNoti,
  };
};
