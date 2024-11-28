
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <main className="main" id="top">
      <Outlet/>
    </main>
  );
};

export default Layout;
