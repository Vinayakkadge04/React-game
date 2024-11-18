import Navbar from "./NavBar/navbar";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <main className="main" id="top">
      <Navbar/>
      <Outlet />
    </main>
  );
};

export default Layout;
