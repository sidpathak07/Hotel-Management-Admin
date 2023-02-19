import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/auth";
import { AdminNavbar } from "../components/AdminNavbar";
import { Base } from "../components/Base";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export const ManageHotel = () => {
  const [searchData, setSearchData] = useState(() => "");
  const [hotelList, setHotelList] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const navigate = useNavigate();

  const submitSearchDetails = (e) => {
    console.log(searchData);
    if (searchData) {
      axios({
        method: "post",
        url: "http://localhost:4000/api/v1//hotel/querysearch",
        data: {
          query: searchData,
        },
        headers: {
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setHotelList(response.data.hotels);
          }
          if (response.status === 203) {
            toast.error(response.data.message);
          }
        })
        .catch((err) => toast.error(err));
    }
  };
  const updateHotel = (hotelId) => {
    navigate(`/updatehotel/${hotelId}`);
  };

  const deleteHotel = (hotelId) => {
    axios({
      method: "DELETE",
      url: "http://localhost:4000/api/v1/hotel/deletehotel",
      headers: {
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
      data: {
        hotelId: hotelId,
      },
    }).then((res) => {
      if (res.status === 200) {
        let updatedHotelList = hotelList.filter(
          (hotel) => hotel._id !== hotelId
        );
        setHotelList(updatedHotelList);
        toast.success("Hotel Deleted successfully");
      }
    });
  };
  return (
    <Base>
      <AdminNavbar />
      <h1 className="font-bold text-2xl text-electric-blue text-center my-2">
        ManageHotel
      </h1>
      <div className="w-[70vw] lg:w-[40vw] h-[30vh] lg:h-[20vh]  border-2 border-black  sm:border-none bg-white mx-auto mt-4 shadow-gray-400  flex flex-col justify-evenly rounded-2xl items-center shadow-2xl">
        <div className="shadow-zinc-900 w-[90%]">
          <input
            className="w-full px-2 shadow-inner border-2 border-gray-200 rounded-xl h-12 outline-none"
            type="text"
            placeholder="Search Hotel Name , City , State"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>

        <button className="btn-yellow" onClick={submitSearchDetails}>
          Search
        </button>
      </div>
      <div className="sm:grid sm:grid-auto-fit-xs gap-8 mt-4">
        {hotelList.map((hotel, index) => (
          <div key={hotel._id} className="p-2">
            <p>
              <span className="font-bold">Hotel Name:-</span> {hotel.hotelName}
            </p>
            <p>
              <span className="font-bold">City:-</span> {hotel.city}
            </p>
            <p>
              <span className="font-bold">State:-</span> {hotel.state}
            </p>
            <p>
              <span className="font-bold">Address:-</span> {hotel.address}
            </p>
            <button className="btn-yellow mr-2">Update</button>
            <button className="btn-red" onClick={() => deleteHotel(hotel._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </Base>
  );
};
