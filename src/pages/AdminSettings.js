import React, { useState, useContext } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { Base } from "../components/Base";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { HotelManagementContext } from "../context/HotelContext";
import validator from "validator";
import { isAuthenticated } from "../auth/auth";
export const AdminSettings = () => {
  const { user } = useContext(HotelManagementContext);
  const [isLoading, setIsLoading] = useState(() => false);
  const [email, setEmail] = useState(() => "");
  const [name, setName] = useState(() => "");
  const [phoneno, setPhoneno] = useState(() => "");
  const createAdmin = (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    let isEmail = validator.isEmail(email);
    let isPhoneno = validator.isMobilePhone(phoneno);

    if (isEmail && name && isPhoneno) {
      axios({
        method: "post",
        url: "http://localhost:4000/api/v1/admin/createAdmin",
        data: {
          email: email,
          name: name,
          phoneno: phoneno,
        },
        headers: {
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
      })
        .then((res) => {
          setIsLoading((prev) => !prev);
          if (res.data.success) toast.success("Admin User Created");
          else {
            toast.error("Failed to create admin..Please use valid emailId");
          }
        })
        .catch((err) => {
          toast.error("Failed to create admin please try again");
        });
    } else {
      toast.error("Enter all fields with valid data");
    }
  };
  return (
    <Base>
      <AdminNavbar />
      <div className="my-3 flex flex-col w-[75vw] md:w-[30vw] h-[80vw] md:h-[30vw] justify-around mx-auto shadow-2xl">
        <h1 className="text-center text-2xl text-electric-blue font-bold">
          Create Admin
        </h1>
        <input
          className="px-2 border-b-2 border-gray-200 w-[90%] md:w-[75%] h-10 mx-auto outline-none shadow-inner rounded-xl"
          type="name"
          name="name"
          id="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-2 border-b-2  border-gray-200 w-[90%] md:w-[75%] h-10 mx-auto outline-none shadow-inner rounded-xl"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-2 border-b-2 border-gray-200 w-[90%] md:w-[75%] h-10 mx-auto outline-none shadow-inner rounded-xl"
          type="text"
          name="phoneno"
          id="phoneno"
          placeholder="Enter Phone"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
        />
        <button
          onClick={createAdmin}
          className="btn-yellow lg:w-[10vw] mx-auto"
        >
          Create Admin
        </button>
      </div>
      {isLoading && <Spinner />}
    </Base>
  );
};
