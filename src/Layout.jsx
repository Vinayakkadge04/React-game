
import { Outlet, Link } from "react-router-dom";

const Layout = ({children}) => {
  return (
    <main className="main" id="top">
     {children}
    </main>
  );
};

export default Layout;
