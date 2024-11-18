import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
      setPathname(location.pathname);
  }, [location]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top py-5 d-block"
      data-navbar-on-scroll="data-navbar-on-scroll"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={
              pathname == "/" || pathname.startsWith("/from-")
                ? "/images/findmetro-white.webp"
                : "/images/findmetro-dark.webp"
            }
            id={pathname === "/" || pathname.startsWith("/from-") ? "home-brand" : ""}
            height={30}
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div
          className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base align-items-lg-center align-items-start">
            {/* <li className="nav-item px-3 px-xl-4"><Link className="nav-link fw-medium" aria-current="page" to="#">Home</Link></li>
                        <li className="nav-item px-3 px-xl-4"><Link className="nav-link fw-medium" aria-current="page" to="#">About</Link></li>
                        <li className="nav-item px-3 px-xl-4"><Link className="nav-link fw-medium" aria-current="page" to="#">Testimonial</Link></li>
                        <li className="nav-item px-3 px-xl-4"><Link className="nav-link fw-medium" aria-current="page" to="#">Contact</Link></li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
