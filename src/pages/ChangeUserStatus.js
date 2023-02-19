import React, { useState, useContext, useEffect } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { Base } from "../components/Base";
import { HiSearch } from "react-icons/hi";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { HotelManagementContext } from "../context/HotelContext";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/auth";

export const ChangeUserStatus = () => {
  const { user } = useContext(HotelManagementContext);
  const [isLoading, setIsLoading] = useState(() => false);
  const [searchedUser, setSearchedUser] = useState(() => null);
  const [email, setEmail] = useState(() => "");
  const [adminList, setAdminList] = useState(() => []);
  const [isLoadingAdminList, setIsLoadingAdminList] = useState(() => false);

  const searchUser = (e) => {
    setIsLoading((prev) => !prev);
    e.preventDefault();
    console.log(email);
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/admin/getUser",
      data: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
      .then((res) => {
        setIsLoading((prev) => !prev);
        if (res.data.success && res.data.user != null) {
          console.log(res.data.user);
          setSearchedUser(res.data.user);
        } else {
          toast.error("No user found");
        }
      })
      .catch((err) => {
        setIsLoading((prev) => !prev);
        toast.error("Unknown error");
      });
  };

  const getAdminList = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/api/v1/admin/getAllAdminList",
      headers: {
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setAdminList(res.data.users);
    });
  };

  const removeAdmin = (e, userId) => {
    axios({
      method: "put",
      url: "http://localhost:4000/api/v1/updaterole/removeadmin",
      data: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(`${res.data.message}`);
          setSearchedUser(null);
          getAdminList();
        } else {
          toast.error(`${res.data.message}`);
        }
      })
      .catch((err) => {
        toast.error("Try again later");
      });
  };

  const addAdmin = (e, userId) => {
    axios({
      method: "put",
      url: "http://localhost:4000/api/v1/updaterole/addadmin",
      data: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(`${res.data.message}`);
          setSearchedUser(null);
          setEmail("");
          getAdminList();
        } else {
          toast.error(`${res.data.message}`);
        }
      })
      .catch((err) => {
        toast.error("Try again later");
      });
  };

  useEffect(() => {
    setIsLoadingAdminList((prev) => !prev);
    getAdminList();
    setIsLoadingAdminList((prev) => !prev);
  }, []);
  return (
    <div>
      <Base>
        <AdminNavbar />
        <div className="text-electric-blue w-[90%] mx-auto">
          <h1 className="text-2xl font-bold text-center mt-2">Manage Admin</h1>
          <div className="lg:flex mt-2 justify-center text-center">
            <input
              className="border-2 outline-none border-pink-500 rounded-xl px-2 w-[50vw] md:w-[30vw] h-10"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-yellow rounded-xl ml-2" onClick={searchUser}>
              <HiSearch size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          {!isLoading && searchedUser && (
            <div className="px-3 my-4 w-[50%] mx-auto">
              <h1 className="my-2 text-xl font-bold text-center">
                Searched User
              </h1>
              <div className="text-center my-2 mx-2  h-[10vw] flex flex-col justify-around">
                <p>Name: {searchedUser.name}</p>
                <p>Email: {searchedUser.email}</p>
                <p>Role: {searchedUser.role}</p>

                {searchedUser.role === "admin" ? (
                  <button
                    onClick={(e) => removeAdmin(e, searchedUser._id)}
                    className="btn-red w-[10vw] mx-auto"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={(e) => addAdmin(e, searchedUser._id)}
                    className="btn-green w-[10vw] mx-auto"
                  >
                    Add Admin
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="text-center">
            <h1 className="mt-4 font-bold text-xl">List of Admins</h1>
            {isLoadingAdminList && <Spinner />}
            <div className="grid grid-auto-fit-xs">
              {adminList.map((admin, index) => (
                <div
                  key={index}
                  className="my-2 mx-2 border-2 border-gray-300 hover:shadow-2xl h-[35vw] md:h-[25vw] lg:h-[13vw] flex flex-col justify-around"
                >
                  <p>Name: {admin.name}</p>
                  <p>Email: {admin.email}</p>
                  <button
                    disabled={admin.email === user.email ? true : false}
                    className={
                      admin.email === user.email
                        ? "cursor-not-allowed btn-red w-[20vw] md:w-[13vw] lg:w-[10vw] mx-auto"
                        : "btn-red w-[20vw] md:w-[13vw] lg:w-[10vw] mx-auto"
                    }
                    onClick={(e) => removeAdmin(e, admin._id)}
                  >
                    Remove Admin
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};
