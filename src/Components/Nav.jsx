import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { logoutService } from "../Services/authService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigator = useNavigate();

  const handleLogout = async () => {
    await logoutService();
    setUser(null);
    navigator("/login");
  };

  // first letter of name for avatar
  const firstLetter = user?.firstName?.charAt(0)?.toUpperCase() || "U";

  // navbar darkening on scroll
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const onScroll = () => {
      if (window.scrollY > 15) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // static wishlist count (replace later with real logic)
  const wishlistCount = 1;

  return (
   <header className="navbar sticky top-0 z-50 bg-[#0E0D13] border-b border-[#2D2A37] transition-all duration-300 ease-out">

      {/* gradient glow strip under navbar */}
      <div className="navbar-gradient-bar"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight ui-action">
          <span className="text-white">Livin</span>
          <span className="text-[#8C5FF6]">Go</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {user ? (
              user.userType === "host" ? (
                <>
                  <li><Link to="/" className="navlink ui-action">Home</Link></li>
                  <li><Link to="/host/host-homes" className="navlink ui-action">Host Homes</Link></li>
                  <li><Link to="/host/add-home" className="navlink ui-action">Add Home</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className="navlink ui-action">Home</Link></li>
                  <li><Link to="/homes" className="navlink ui-action">Listed Homes</Link></li>
                  <li><Link to="/bookings" className="navlink ui-action">Bookings</Link></li>
                </>
              )
            ) : (
              <>
                <li><Link to="/" className="navlink ui-action">Home</Link></li>
                <li><Link to="/homes" className="navlink ui-action">Homes</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center space-x-5">

          {/* LOGGED IN */}
          {user ? (
            <>
              {/* Wishlist + Become Host only for guest */}
              {user.userType !== "host" && (
                <>
                  <Link to="/host/add-home"
                    className="hidden md:inline-block bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white font-semibold px-5 py-2 rounded-full shadow-md ui-action">
                    Become a Host
                  </Link>

                  <Link to="/favourite" className="hidden md:inline-block wishlist-icon ui-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.645 1.145-4.312 2.795C11.333 4.895 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z" />
                    </svg>

                    {/* WISHLIST COUNT */}
                    <span className="wishlist-count">{wishlistCount}</span>
                  </Link>
                </>
              )}

              {/* PROFILE DROPDOWN */}
              <div className="relative group">
                <button className="avatar-btn ui-action">
                  {firstLetter}
                </button>

                <div className="absolute right-0 mt-2 w-52 bg-[#18171F] border border-[#2D2A37] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out dropdown-menu">

                  <Link to="/profile" className="dropdown-btn">My Profile</Link>

                  {user.userType === "guest" && (
                    <>
                      <Link to="/bookings" className="dropdown-btn">My Bookings</Link>
                      <Link to="/favourite" className="dropdown-btn">My Wishlist</Link>
                    </>
                  )}

                  {user.userType === "host" && (
                    <Link to="/host/host-homes" className="dropdown-btn">Host Dashboard</Link>
                  )}

                  <button onClick={handleLogout} className="dropdown-btn logout">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* LOGGED OUT */
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white font-semibold px-5 py-2 rounded-full shadow-md ui-action"
            >
              Login
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#E5E3F3] ui-action">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="mobile-nav">
          <ul className="flex flex-col space-y-4 text-[#E5E3F3] font-medium">

            <li><Link to="/" className="ui-action">Home</Link></li>

            {user ? (
              user.userType === "host" ? (
                <>
                  <li><Link to="/host/host-homes" className="ui-action">Host Homes</Link></li>
                  <li><Link to="/host/add-home" className="ui-action">Add Home</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/homes" className="ui-action">Homes</Link></li>
                  <li><Link to="/favourite" className="ui-action">Wishlist</Link></li>
                  <li><Link to="/host/add-home" className="ui-action">Become a Host</Link></li>
                </>
              )
            ) : null}

            {user && <li><Link to="/bookings" className="ui-action">Bookings</Link></li>}
            {user && <li><Link to="/profile" className="ui-action">Profile</Link></li>}

            {user ? (
              <button onClick={handleLogout} className="text-left w-full text-[#F97373] ui-action">Logout</button>
            ) : (
              <li><Link to="/login" className="ui-action">Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
