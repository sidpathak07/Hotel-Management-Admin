import React, { useContext, useState } from "react";
import { Base } from "../components/Base";
import { HotelManagementContext } from "../context/HotelContext";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const { user, setUser } = useContext(HotelManagementContext);
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [showPassword, setShowPassword] = useState(() => false);
  const navigate = useNavigate();
  const submitCredentials = (e) => {
    e.preventDefault();
    console.log(email, password);
    let isEmail = validator.isEmail(email);
    let isStrongPassword = validator.isStrongPassword(password);
    if (isEmail && isStrongPassword && email && password) {
      axios({
        method: "post",
        url: "http://localhost:4000/api/v1/login",
        data: {
          email: email,
          password: password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            if (res.data.user.role === "admin") {
              setUser({
                name: res.data.user.name,
                email: res.data.user.email,
                phoneno: res.data.user.phoneno,
                role: res.data.user.role,
                isVerifiedEmail: res.data.user.isVerifiedEmail,
                bookings: res.data.user.booking,
                token: res.data.token,
              });
              localStorage.setItem(
                "user",
                JSON.stringify({
                  name: res.data.user.name,
                  email: res.data.user.email,
                  phoneno: res.data.user.phoneno,
                  role: res.data.user.role,
                  isVerifiedEmail: res.data.user.isVerifiedEmail,
                  bookings: res.data.user.booking,
                  token: res.data.token,
                })
              );
              toast.success("Sign In Success Redirecting to Profile");
              setTimeout(() => {
                navigate("/adminsettings");
              }, 3000);
            } else {
              toast.error("Only Admin Can Have access to resource");
            }
          } else {
            toast.error(`${res.data.message}`);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please enter email in correct format and password");
    }
  };

  return (
    <Base>
      <div className="w-[70vw] lg:w-[40vw] h-[50vh] lg:h-[50vh] bg-white mx-auto mt-4 shadow-gray-400  flex flex-col justify-evenly rounded-2xl items-center shadow-2xl">
        <p className="text-center sm:text-xl underline-offset-8 underline font-bold sm:font-extraboldbold text-electric-blue">
          Sign In
        </p>
        <div className="shadow-zinc-900 rounded-xl w-[90%]">
          <input
            className="px-2 shadow-inner border-2 w-[90%] border-gray-200 rounded-xl h-12 outline-none"
            type="text"
            placeholder="Enter Email"
            name="email-tag"
            id="email-tag"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="shadow-zinc-900 w-[90%] rounded-xl flex gap-2">
          <input
            className="shadow-inner border-2 px-2 border-gray-200 rounded-xl outline-none w-[90%] h-12"
            type={showPassword ? "text" : "password"}
            name="password-tag"
            id="password-tag"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <button onClick={() => setShowPassword((prev) => !prev)}>
              <HiEyeOff />
            </button>
          ) : (
            <button onClick={() => setShowPassword((prev) => !prev)}>
              <HiEye />
            </button>
          )}
        </div>
        <button
          onClick={submitCredentials}
          className="btn-yellow text-center sm:text-xl font-bold sm:font-extraboldbold text-electric-blue"
        >
          Sign In
        </button>
      </div>
    </Base>
  );
};
