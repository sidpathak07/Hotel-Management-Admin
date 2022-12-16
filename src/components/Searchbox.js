import React, { useContext } from "react";
import { HotelManagementContext } from "../context/HotelContext";
export const Searchbox = () => {
  const { searchData, setSearchData } = useContext(HotelManagementContext);
  return (
    <div className="w-[70vw] lg:w-[40vw] h-[50vh] lg:h-[50vh]  border-2 border-black  sm:border-none bg-white mx-auto mt-4 shadow-gray-400  flex flex-col justify-evenly rounded-2xl items-center shadow-2xl">
      {/* <section className=" h-[100%] "> */}
      <p className="text-center sm:text-xl font-bold sm:font-extraboldbold text-electric-blue">
        Check Room Availability
      </p>
      <div className="shadow-zinc-900 w-[90%]">
        {/* <input className="w-[100%] h-12 rounded-2xl" type="text" /> */}
        <input
          className="w-full px-2 shadow-inner border-2 border-gray-200 rounded-xl h-12 outline-none"
          type="text"
          placeholder="Search Hotel Name , City , State"
          value={searchData.searchQuery}
          onChange={(e) =>
            setSearchData((prev) => {
              return { ...prev, searchQuery: e.target.value };
            })
          }
        />
      </div>

      <div className="lg:flex w-[90%] justify-between">
        <div className="mb-4 sm:mb-0">
          <p>From</p>
          <input
            className="shadow-inner border-2 px-2 border-gray-200 rounded-xl outline-none w-[80%] h-12"
            type="date"
            name=""
            id=""
          />
        </div>
        <div>
          <p>To</p>
          <input
            className="shadow-inner border-2 px-2 border-gray-200 rounded-xl outline-none w-[80%] h-12"
            type="date"
            name=""
            id=""
          />
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};
