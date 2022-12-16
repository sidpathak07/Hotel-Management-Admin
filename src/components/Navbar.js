import React, { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { HotelManagementContext } from "../context/HotelContext";

export const Navbar = () => {
  const { user, setUser } = useContext(HotelManagementContext);
  const [isMenuClicked, setIsMenuClickeded] = useState(() => {
    return false;
  });
  return (
    <nav
      className={
        isMenuClicked
          ? "flex justify-around items-center h-[22vh] bg-indigo-900 text-white border-b border-white"
          : "flex justify-around items-center h-[12vh] bg-indigo-900 text-white  border-b border-white"
      }
    >
      <p className="font-bold text-xl">Easy@Booking</p>
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
          <NavLink>Hotels</NavLink>
        </li>
        <li className="py-1">
          <NavLink>Admin Settings</NavLink>
        </li>
        <li className="py-1">
          <NavLink>Profile</NavLink>
        </li>
        {user.email ? (
          <li className="btn-yellow">
            <NavLink>Sign Out</NavLink>
          </li>
        ) : (
          <li className="btn-yellow">
            <NavLink>Sign In</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
