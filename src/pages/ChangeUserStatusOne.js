import React from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { Base } from "../components/Base";
import { HiSearch } from "react-icons/hi";
export const ChangeUserStatusOne = () => {
  return (
    <div>
      <Base>
        <AdminNavbar />
        <div className="text-electric-blue w-[90%] mx-auto">
          <h1 className="text-2xl font-bold text-center">Manage Admin</h1>
          <div className="flex mt-2 justify-center">
            <input
              className="border-2 border-pink-500 rounded-xl px-2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
            />
            <button className="btn-yellow rounded-xl ml-2">
              <HiSearch size={20} />
            </button>
          </div>
        </div>
      </Base>
    </div>
  );
};
