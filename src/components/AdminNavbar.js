import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const AdminNavbar = () => {
  const [isHamOn, setIsHamOn] = useState(() => false);
  return (
    <div className="text-electric-blue border-b-2 border-b-shocking-yellow">
      <p className="sm:hidden my-3">
        <HiMenu onClick={() => setIsHamOn((prev) => !prev)} size={30} />
      </p>

      {isHamOn && (
        <ul className="grid grid-auto-fit-xs gap-8 text-center sm:hidden mb-3">
          <li>
            <NavLink className="hover:underline" to="/adminsettings">
              Create Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:underline"
              to="/adminsettings/changeuserstatus"
            >
              Manage Admin
            </NavLink>
          </li>
          <li>
            <NavLink className="hover:underline" to="/adminsettings/addhotel">
              Add Hotel
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:underline"
              to="/adminsettings/updatehotel"
            >
              Update Hotel
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:underline"
              to="/adminsettings/getbookingstats"
            >
              Bookings Stats
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:underline"
              to="/adminsettings/sitesettings"
            >
              Site Settings
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="hidden sm:grid sm:grid-auto-fit-xs gap-8 text-center py-3">
        <li>
          <NavLink className="hover:underline" to="/adminsettings">
            Create Admin
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:underline"
            to="/adminsettings/changeuserstatus"
          >
            Manage Admin
          </NavLink>
        </li>
        <li>
          <NavLink className="hover:underline" to="/adminsettings/addhotel">
            Add Hotel
          </NavLink>
        </li>
        <li>
          <NavLink className="hover:underline" to="/adminsettings/managehotel">
            Manage Hotel
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:underline"
            to="/adminsettings/getbookingstats"
          >
            Bookings Stats
          </NavLink>
        </li>
        <li>
          <NavLink className="hover:underline" to="/adminsettings/sitesettings">
            Site Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
