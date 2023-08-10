import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [redirect, setRedirect] = useState(false);
  const { setProfile, profile } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("/auth/login", {
        withCredentials: true,
      })
      .then((res) => setProfile(res.data) && setRedirect(false));
  }, [redirect]);

  const handleLogOut = async () => {
    try {
      await axios({
        method: "post",
        url: "/auth/logout",
        withCredentials: true,
      }).then((res) => {
        if (res.data === "ok") {
          setProfile(null);
          return setRedirect(true);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <header className="bg-gray-100 mb-2 shadow drop-shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="text-2xl uppercase font-bold leading-6 text-gray-900"
          >
            Blog
          </Link>
        </div>
        {profile ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/blog/create"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Create new Blog
            </Link>
            <span className="px-2">/</span>
            <button
              onClick={handleLogOut}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/auth/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in
            </Link>
            <span className="px-2">/</span>
            <Link
              to="/auth/register"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
