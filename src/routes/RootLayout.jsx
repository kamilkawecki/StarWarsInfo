import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div className="min-h-screen">
      <div className="bg-main min-h-screen min-w-full bg-center bg-repeat fixed top-0 left-auto z-[-1]"></div>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;
