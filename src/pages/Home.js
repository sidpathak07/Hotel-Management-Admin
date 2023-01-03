import React, { useContext } from "react";
import { Base } from "../components/Base";
import { Searchbox } from "../components/Searchbox";
import { isAuthenticated } from "../auth/auth";
import { HotelManagementContext } from "../context/HotelContext";

export const Home = () => {
  const { searchData } = useContext(HotelManagementContext);
  return (
    <Base>
      <div className="text-center py-4 text-electric-blue font-extrabold">
        <p>
          List a Hotel? <button className="btn-yellow mx-2">Add Hotel</button>
        </p>
      </div>

      <Searchbox />
      <button
        className="btn-yellow"
        onClick={() => {
          console.log(searchData);
        }}
      >
        Check
      </button>
    </Base>
  );
};
