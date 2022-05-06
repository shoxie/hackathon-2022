import React, { FC } from "react"
import Background from "../../../public/assets/bg-dark.jpg"
import Header from "./components/Header"
import Footer from "./components/Footer"

// eslint-disable-next-line react/function-component-definition
const Layout:FC<{children: React.ReactNode}> = ({ children }) => (
  <>
    <header className="w-full">
      <Header />
    </header>
    <main className="px-5 pb-10 mx-auto max-w-screen-2xl">{children}</main>
    <footer className="w-full">
      <Footer />
    </footer>
  </>
)

export default Layout
