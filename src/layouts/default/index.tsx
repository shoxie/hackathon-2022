import React, { FC } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "@/common/Toast";
import { useNotification } from "@/hooks/useNotification";

// eslint-disable-next-line react/function-component-definition
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const noti = useNotification()
  return (
    <>
      {noti.notis.map((item, idx: number) => (
        <Toast
          item={item}
          key={`${item.type}-${item.message}-${String(idx)}`}
        />
      ))}
      <header className="w-full">
        <Header />
      </header>
      <main className="pb-10">{children}</main>
      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
