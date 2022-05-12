import withTransition from "@/common/PageTransition";
import { getUserInfo, login, register } from "@/services/api";
import { useState } from 'react';
import { AuthPayload, User } from "@/store/type";

const Auth = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUser({ ...user, [key]: e.target.value });
  };

  const handleLogin = () => {
    noti.show({
      type: "loading",
      message: "Đang đăng nhập...",
    });
    login(user)
      .then((res) => {
        userService.setUser(res.data as any);
        setIsLoggedIn(true);
        handleModalOpen(false);
        noti.show({
          type: "success",
          message: "Đăng nhập thành công",
        });
      })
      .catch((err) => {
        noti.show({
          type: "error",
          message: "Đăng nhập thất bại",
        });
        console.log(err);
      });
  };

  const handleSignUp = () => {
    register(user)
      .then((res) => {
        userService.setUser(res.data as any);
        handleModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-screen-xl px-5 mx-auto lg:px-0">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-5">
          <div>
            <span className="text-2xl font-medium text-secondary">
              Đăng nhập
            </span>
          </div>
          <div className="flex flex-col items-start p-2 rounded-full">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              className="pl-2 border rounded-lg border-primary focus:outline-none"
              id="username"
              onChange={(e) => handleInputChange(e, "email")}
              type="text"
            />
          </div>
          <div className="flex flex-col items-start p-2 rounded-full">
            <label htmlFor="password">Mật khẩu</label>
            <input
              className="pl-2 border rounded-lg border-primary focus:outline-none"
              id="password"
              onChange={(e) => handleInputChange(e, "password")}
              type="password"
            />
          </div>
          <div className="flex flex-row items-center justify-center space-x-5">
            <button onClick={handleLogin} className="general-button">
              Đăng nhập
            </button>
            <button onClick={handleSignUp} className="general-button">
              Đăng kí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTransition(Auth);
