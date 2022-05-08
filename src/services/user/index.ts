import { AuthPayload } from "@/store/type";
import Cookies from "js-cookie";

const userService = {
  setUser: (user: AuthPayload) => {
    Cookies.set("user", JSON.stringify(user));
    return true;
  },
  getUser: () => {
    var user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => {
    Cookies.remove("user");
    return true;
  },
};

export default userService;
