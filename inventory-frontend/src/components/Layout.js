import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  return (
    <>
      <div className="md:h-16">
        <Header />
      </div>
      <div className="flex bg-white">
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex min-w-max">
          <SideMenu />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
