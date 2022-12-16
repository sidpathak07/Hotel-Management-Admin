import React, { useContext } from "react";
import { Base } from "../components/Base";
import { Searchbox } from "../components/Searchbox";
import { HotelManagementContext } from "../context/HotelContext";
import { toast } from "react-toastify";
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
        onClick={() => toast.success("SUCCESS TOAST")}
      >
        Check Search
      </button>
    </Base>
  );
};
