import React, { useContext, useState } from "react";
import { Base } from "../components/Base";
import { HotelManagementContext } from "../context/HotelContext";
import { HiEyeOff, HiEye } from "react-icons/hi";
export const Signup = () => {
  const { user, setUser } = useContext(HotelManagementContext);
  const [showPassword, setShowPassword] = useState(() => false);

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
          />
        </div>

        <div className="shadow-zinc-900 w-[90%] rounded-xl flex gap-2">
          <input
            className="shadow-inner border-2 px-2 border-gray-200 rounded-xl outline-none w-[90%] h-12"
            type={showPassword ? "text" : "password"}
            name=""
            id=""
            placeholder="Enter Password"
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
        <button className="btn-yellow text-center sm:text-xl font-bold sm:font-extraboldbold text-electric-blue">
          Sign In
        </button>
      </div>
    </Base>
  );
};
