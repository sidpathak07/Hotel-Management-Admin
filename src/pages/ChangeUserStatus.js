import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Base } from "../components/Base";
import { HiMenu } from "react-icons/hi";
import { HotelManagementContext } from "../context/HotelContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { AdminNavbar } from "../components/AdminNavbar";

export const ChangeUserStatus = () => {
  const { showAdminSettingsMenu, setShowAdminSettingsMenu, user } = useContext(
    HotelManagementContext
  );

  const [isLoadingAdminList, setIsLoadingAdminList] = useState(() => false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(() => false);
  const [email, setEmail] = useState(() => "");
  const [searchedUser, setSearchedUser] = useState(() => null);
  const [adminList, setAdminList] = useState(() => []);

  const getAdminList = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/api/v1/admin/getAllAdminList",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setAdminList(res.data.users);
      setIsLoadingAdminList((prev) => !prev);
    });
  };
  const searchUser = (e) => {
    setIsLoadingSearch((prev) => !prev);
    e.preventDefault();
    console.log(email);
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/admin/getUser",
      data: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        setIsLoadingSearch((prev) => !prev);
        if (res.data.success && res.data.user != null) {
          setSearchedUser(res.data.user);
        } else {
          toast.error("No user found");
        }
      })
      .catch((err) => {
        setIsLoadingSearch((prev) => !prev);
        toast.error("Unknown error");
      });
  };

  const changeUserRole = (e, role, userId) => {
    if (role === "admin") {
      axios({
        method: "post",
        url: "http://localhost:4000/api/v1/updaterole/removeadmin",
        data: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(`${res.data.message}`);
          setSearchedUser(res.data.user);
        } else {
          toast.error(`${res.data.message}`);
        }
      });
    } else {
      axios({
        method: "post",
        url: "http://localhost:4000/api/v1/updaterole/addadmin",
        data: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(`${res.data.message}`);
          setSearchedUser(res.data.user);
        } else {
          toast.error(`${res.data.message}`);
        }
      });
    }
  };

  const removeAdmin = (userId) => {
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/updaterole/removeadmin",
      data: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.success) {
        toast.success(`${res.data.message}`);
        let newAdminList = adminList.filter((admin) => admin._id !== userId);
        setAdminList(newAdminList);
      } else {
        toast.error(`${res.data.message}`);
      }
    });
  };

  // useEffect(() => {
  //   setIsLoadingAdminList((prev) => !prev);
  //   getAdminList();
  // }, []);
  return (
    <Base>
      <AdminNavbar />
      <div className="text-center font-bold text-2xl">
        <h1 className="text-2xl my-3">Manage Admin</h1>
        <div className="flex justify-center mx-auto border-2 border-black">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-pink-500"
          />
          <button className="btn-yellow">Search</button>
        </div>
        {searchedUser && (
          <div className="font-normal mx-auto mt-4 w-[75%]">
            <p className="font-bold text-2xl">Searched User</p>
            <table className="table-fixed text-center">
              <thead>
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Role
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`${searchedUser.name}`}</td>
                  <td>{`${searchedUser.email}`}</td>
                  <td>{`${searchedUser.role}`}</td>
                  <td>
                    <button
                      className={`${
                        searchedUser.role === "admin" ? "btn-red" : "btn-green"
                      }`}
                      onClick={(e) =>
                        changeUserRole(e, searchedUser.role, searchedUser._id)
                      }
                    >
                      {searchedUser.role === "admin"
                        ? "Remove Admin"
                        : "Add Admin"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <p className="font-bold text-2xl mt-4">Present Admin</p>
        <Spinner />
        {!isLoadingAdminList && (
          <table className="table-auto text-center font-normal mx-auto w-[75%]">
            <thead>
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin, index) => {
                return (
                  <tr key={index}>
                    <td className="py-3 px-6">{`${admin.name}`}</td>
                    <td className="py-3 px-6">{`${admin.email}`}</td>
                    <td className="py-3 px-6">
                      <button
                        className="btn-red"
                        onClick={(e) => removeAdmin(admin._id)}
                      >
                        Remove Admin
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Base>
  );
};
