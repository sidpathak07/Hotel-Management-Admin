import axios from "axios";
import React, { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { HotelManagementContext } from "../context/HotelContext";

export const Navbar = () => {
  const { user, setUser } = useContext(HotelManagementContext);
  const [isMenuClicked, setIsMenuClickeded] = useState(() => {
    return false;
  });
  const navigate = useNavigate();
  const signOut = (e) => {
    localStorage.removeItem("user");
    setUser({
      name: "",
      email: "",
      isVerifiedEmail: Boolean,
      role: "",
      phoneno: "",
      bookings: null,
      token: "",
    });
    navigate("/Signin");
  };
  return (
    <nav
      className={
        isMenuClicked
          ? "flex justify-around items-center h-[22vh] bg-indigo-900 text-white border-b border-white"
          : "flex justify-around items-center h-[12vh] bg-indigo-900 text-white  border-b border-white"
      }
    >
      <p className="font-bold text-xl">
        <NavLink to="/"> Easy@Booking </NavLink>
      </p>
      <p
        className={isMenuClicked ? "hidden" : "visible sm:hidden"}
        onClick={() => setIsMenuClickeded((prev) => !prev)}
      >
        <HiMenu />
      </p>

      <ul
        className={
          isMenuClicked
            ? "font-medium"
            : "hidden w-[30rem] sm:visible sm:flex sm:justify-around"
        }
      >
        <li className={isMenuClicked ? "" : "hidden"}>
          <HiX onClick={() => setIsMenuClickeded((prev) => !prev)} />
        </li>
        <li className="py-1">
          <NavLink to="/hotellist">Hotels</NavLink>
        </li>
        {user.email ? (
          <li className="py-1">
            <NavLink to="/adminsettings">Admin Settings</NavLink>
          </li>
        ) : (
          ""
        )}

        {user.email ? (
          <li className="py-1">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        ) : (
          ""
        )}

        {user.email ? (
          <li className="btn-yellow" onClick={signOut}>
            Sign Out
          </li>
        ) : (
          <li className="btn-yellow">
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
