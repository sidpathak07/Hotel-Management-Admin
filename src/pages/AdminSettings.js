import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Base } from "../components/Base";
import { HiMenu } from "react-icons/hi";
import { HotelManagementContext } from "../context/HotelContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";

export const AdminSettings = () => {
  const { showAdminSettingsMenu, setShowAdminSettingsMenu, user } = useContext(
    HotelManagementContext
  );

  const [isLoading, setIsLoding] = useState(() => true);
  const [email, setEmail] = useState(() => "");
  const [name, setName] = useState(() => "");
  const [phoneno, setPhoneno] = useState(() => "");
  const createAdmin = (e) => {
    e.preventDefault();
    setIsLoding((prev) => !prev);
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/admin/createAdmin",
      data: {
        email: email,
        name: name,
        phoneno: phoneno,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        setIsLoding((prev) => !prev);
        if (res.data.success) toast.success("Admin User Created");
        else {
          toast.error("Failed to create admin..Please use valid emailId");
        }
      })
      .catch((err) => {
        toast.error("Failed to create admin please try again");
      });
  };

  return (
    <Base>
      <div className="grid grid-cols-3 min-h-screen text-electric-blue">
        <div
          className={
            showAdminSettingsMenu
              ? "border-2 border-blue-500 col-span-1 lg:text-center"
              : "border-2 border-blue-500 col-span-1 lg:text-center hidden"
          }
        >
          <div className="ml-2 lg:ml-0">
            <div
              className="my-2 lg:hidden"
              onClick={() => setShowAdminSettingsMenu((prev) => !prev)}
            >
              <HiMenu size={30} />
            </div>
            <div className="my-2">
              <NavLink to="/adminsettings">Create Admin</NavLink>
            </div>
            <div className="mb-2">
              <NavLink to="/adminsettings/changeuserstatus">
                Add/Remove Admin
              </NavLink>
            </div>
            <div className="mb-2">
              <NavLink to="/adminsettings/addhotel">Add Hotel</NavLink>
            </div>
            <div className="mb-2">
              <NavLink to="/adminsettings/updatehotel">Update Hotel</NavLink>
            </div>
            <div className="mb-2">
              <NavLink to="/adminsettings/getbookingstats">Bookings</NavLink>
            </div>
            <div className="mb-2">
              <NavLink to="/">Available Rooms</NavLink>
            </div>
          </div>
        </div>

        <div
          className={
            showAdminSettingsMenu
              ? "border-2  col-span-2 grid grid-cols-12"
              : "border-2  col-span-3 grid grid-cols-12"
          }
        >
          <div
            className={
              showAdminSettingsMenu
                ? "hidden"
                : "col-span-1 justify-self-center"
            }
            onClick={() => setShowAdminSettingsMenu((prev) => !prev)}
          >
            <HiMenu size={30} />
          </div>
          <div className="col-start-2 col-end-12 text-center font-bold text-2xl">
            <h1 className="font-2xl my-3">Add Admin</h1>
            <div className="shadow-gray-400 shadow-2xl rounded-2xl bg-white flex flex-col justify-evenly h-[50%]  w-[75%] mx-auto mt-3  ">
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-2 shadow-inner border-2 border-gray-200 rounded-xl h-12 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-2 shadow-inner border-2 border-gray-200 rounded-xl h-12 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Phone No"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  className="px-2 shadow-inner border-2 border-gray-200 rounded-xl h-12 outline-none"
                />
              </div>
              <button
                onClick={createAdmin}
                className="btn-yellow w-[30%] mx-auto text-center"
              >
                Create Admin
              </button>
              {isLoading && <Spinner />}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
