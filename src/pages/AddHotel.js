import React, { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Base } from "../components/Base";
import { HiMenu, HiX } from "react-icons/hi";
import { HotelManagementContext } from "../context/HotelContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminNavbar } from "../components/AdminNavbar";
import parse from "html-react-parser";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { isAuthenticated } from "../auth/auth";
import validator from "validator";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const center = {
  lat: 16.705,
  lng: 74.2433,
};
const containerStyle = {
  width: "80vw",
  height: "50vh",
};
export const AddHotel = () => {
  const { user } = useContext(HotelManagementContext);
  const editor = useRef(null);
  const [description, setDescription] = useState(() => "");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [hotelName, setHotelName] = useState(() => "");
  const [position, setPosition] = useState(() => {
    return { lat: 16.705, lng: 74.2433 };
  });
  const [address, setAddress] = useState(() => {
    return "";
  });
  const [formattedAddress, setFormattedAddress] = useState(() => {
    return "";
  });
  const [city, setCity] = useState(() => {
    return "";
  });
  const [state, setState] = useState(() => {
    return "";
  });
  const [pincode, setPincode] = useState(() => {
    return "";
  });
  const [amenity, setAmenity] = useState(() => "");
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const searchForAddress = (e) => {
    e.preventDefault();
    console.log(searchForAddress);
    axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        hotelName + " " + address
      }&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => {
        // console.log(response);
        // console.log(
        //   response.data.results[0].plus_code.compound_code.split(","),
        //   response.data.results[0].formatted_address.split(",")
        // );
        // let cc = response.data.results[0].plus_code.compound_code.split(",");
        // let fa = response.data.results[0].formatted_address.split(",");
        let addcomp = response.data.results[0].address_components;
        for (let index = 0; index < addcomp.length; index++) {
          if (addcomp[index].types[0] === "administrative_area_level_3") {
            setCity(addcomp[index].long_name);
            // console.log(addcomp[index].long_name);
          }
          if (addcomp[index].types[0] === "administrative_area_level_1") {
            setState(addcomp[index].long_name);
            // console.log(addcomp[index].long_name);
          }
          if (addcomp[index].types[0] === "postal_code") {
            setPincode(addcomp[index].long_name);
            // console.log(addcomp[index].long_name);
          }
        }
        setFormattedAddress(response.data.results[0].formatted_address);
        // console.log(response.data.results[0].formatted_address);
        // console.log(cc[cc.length - 2], fa[fa.length - 3]);
        // console.log(
        //   response.data.results[0].geometry.location.lat,
        //   response.data.results[0].geometry.location.lng
        // );
        setPosition({
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
        map.panTo({
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
      })
      .catch((err) => console.log(err));
  };

  const [files, setFiles] = useState(() => []);
  const [photoLinks, setPhotoLinks] = useState(() => []);
  const [amenities, setAmenities] = useState(() => []);
  const [email, setEmail] = useState(() => "");
  const [phoneno, setPhoneNo] = useState(() => "");
  const [checkIn, setCheckIn] = useState(() => "");
  const [checkOut, setCheckOut] = useState(() => "");
  const [roomType, setRoomType] = useState(() => "");
  const [roomDescription, setRoomDescription] = useState(() => "");
  const [roomPhotoFiles, setRoomPhotoFiles] = useState(() => []);
  const [roomPhotoLinks, setRoomPhotoLinks] = useState(() => []);
  const [roomPrice, setRoomPrice] = useState(() => null);
  const [totalRooms, setTotalRooms] = useState(() => null);
  const [roomTypeList, setRoomTypeList] = useState(() => []);
  const UploadPhotos = (e) => {
    for (let i = 0; i < files.length; i++) {
      let data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "pes775ke");
      fetch("https://api.cloudinary.com/v1_1/di9nl8pph/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          let link = {
            id: res.public_id,
            secure_url: res.secure_url,
          };
          setPhotoLinks((arr) => [...arr, link]);
        });
    }
    console.log(photoLinks);
  };

  const addAmenities = (value) => {
    console.log(value);
    setAmenities((prev) => [...prev, value]);
    setAmenity("");
  };

  const removeAmenity = (value) => {
    let newSet = amenities.filter((amenity) => amenity !== value);
    setAmenities(newSet);
  };

  const showHotel = () => {
    let hotel = {
      hotelName,
      description,
      photoLinks,
      formattedAddress,
      city,
      state,
      pincode,
      email,
      phoneno,
      latitude: position.lat,
      longitude: position.lng,
      checkIn,
      checkOut,
      amenities,
      roomTypeList,
    };
    console.log(hotel);
  };

  const submitHotelDetails = () => {
    let isEmail = validator.isEmail(email);
    let isPhoneno = validator.isMobilePhone(phoneno);
    if (
      hotelName &&
      description &&
      photoLinks &&
      formattedAddress &&
      city &&
      state &&
      pincode &&
      email &&
      phoneno &&
      position.lat &&
      position.lng &&
      checkIn &&
      checkOut &&
      amenities &&
      isEmail &&
      isPhoneno &&
      roomTypeList
    ) {
      axios({
        url: "http://localhost:4000/api/v1/hotel/addhotel",
        method: "post",
        headers: {
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
        data: {
          hotelName,
          description,
          photoLinks,
          formattedAddress,
          city,
          state,
          pincode,
          email,
          phoneno,
          latitude: position.lat,
          longitude: position.lng,
          checkIn,
          checkOut,
          amenities,
          roomType: roomTypeList,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Hotel added successfully");
          } else {
            toast.error("Failed to add hotel.Please try again later");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error(
        "Fill up all fields and submit photos first if not submitted"
      );
    }
  };

  const submitRoomPhotos = () => {
    for (let i = 0; i < roomPhotoFiles.length; i++) {
      let data = new FormData();
      data.append("file", roomPhotoFiles[i]);
      data.append("upload_preset", "m0ihauiw");
      fetch("https://api.cloudinary.com/v1_1/di9nl8pph/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          let link = {
            id: res.public_id,
            secure_url: res.secure_url,
          };
          setRoomPhotoLinks((arr) => [...arr, link]);
        });
    }
  };

  const addRoomType = () => {
    let isTotRoomNum = isNaN(totalRooms);
    let isBasePNum = isNaN(roomPrice);
    console.log(isTotRoomNum, isBasePNum);
    if (!isTotRoomNum && !isBasePNum) {
      let room = {
        title: roomType,
        description: roomDescription,
        totalRooms: parseInt(totalRooms),
        availableRooms: parseInt(totalRooms),
        basePrice: parseInt(roomPrice),
        roomImages: roomPhotoLinks,
      };
      setRoomTypeList((arr) => [...arr, room]);
      setRoomType("");
      setRoomDescription("");
      setTotalRooms("");
      setRoomPrice("");
      setRoomPhotoLinks([]);
      setRoomPhotoFiles([]);
      toast.success("Type of Room added!");
    } else {
      toast.error("Enter numeric values for Total Rooms and Base Price");
    }
  };

  return (
    <Base>
      <AdminNavbar />
      <h1 className="text-center text-electric-blue text-xl font-bold">
        Add Hotel
      </h1>
      <div className="w-[70vw] md:w-[75vw] mx-auto text-electric-blue">
        <div className="mt-2">
          <label htmlFor="hotelname">Hotel Name:-</label>
          <input
            type="text"
            name="hotelname"
            id="hotelname"
            placeholder="Hotel Name"
            className="outline-none border-1 w-[50vw] border-gray-300 ml-2"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>
        <div className="mt-2 ">
          <label htmlFor="photos">Add Hotel Photos:-</label>
          <input
            className=" outline-none border-1 border-gray-300 mt-2 ml-2"
            type="file"
            name="photos"
            id="photos"
            multiple={true}
            onChange={(e) => setFiles(e.target.files)}
          />
          <button className="btn-yellow" onClick={UploadPhotos}>
            Submit Files
          </button>
        </div>
        <div className="mt-2">
          <label>Add Description:-</label>
          <ReactQuill
            className="w-[75vw] mx-auto"
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="address">Search Address:- </label>
          <input
            className="outline-none ml-2 border-1 w-[50vw] border-gray-300"
            placeholder="Address"
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="btn-yellow ml-2" onClick={searchForAddress}>
            show on map
          </button>
        </div>
        <div className="mt-2">
          {isLoaded ? (
            <>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
                <Marker position={position} />
              </GoogleMap>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="checkIn">CheckIn:- </label>
          <input
            className="mr-2"
            type="time"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="checkOut">CheckOut:- </label>
          <input
            type="time"
            name="checkOut"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="email" className="mr-2">
            Email:-
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="phoneno" className="mr-2">
            Phone No:-
          </label>
          <input
            type="text"
            name="phoneno"
            id="phoneno"
            value={phoneno}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="amenities" className="mr-2">
            Amenities:-
          </label>
          <input
            type="text"
            className="mr-2"
            name="amenities"
            id="amenities"
            value={amenity}
            onChange={(e) => setAmenity(e.target.value)}
          />
          <button className="btn-yellow" onClick={(e) => addAmenities(amenity)}>
            Add
          </button>
        </div>
        <div className="mt-2">
          {amenities.map((value, index) => (
            <span className="rounded-button-yellow mr-2" key={index}>
              {value}
              <button
                className="ml-1 text-red-500"
                onClick={() => removeAmenity(value)}
              >
                X
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2">
          <p className="font-bold">Enter Room Details</p>
          <div className="mt-2">
            <label htmlFor="roomtype">Room Type:- </label>
            <input
              type="text"
              name="roomtype"
              id="roomtype"
              className="ml-2"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <label htmlFor="roomdescription">Room Description:- </label>
            <ReactQuill
              className="w-[75vw] mx-auto"
              value={roomDescription}
              onChange={setRoomDescription}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="roomphoto">Room Photos:- </label>
            <input
              type="file"
              name="roomphoto"
              id="roomphoto"
              className="ml-2"
              multiple={true}
              onChange={(e) => setRoomPhotoFiles(e.target.files)}
            />
            <button className="btn-yellow" onClick={submitRoomPhotos}>
              Submit Photos
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="totalrooms">Total rooms:-</label>
            <input
              type="text"
              name="totalrooms"
              id="totalrooms"
              className="ml-2 outline-1 outline-black"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <label htmlFor="baseprice">Base Price:-</label>
            <input
              type="text"
              name="baseprice"
              id="baseprice"
              className="ml-2"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
            />
          </div>
          <button className="btn-yellow my-2" onClick={addRoomType}>
            Add Room
          </button>
        </div>
        <div className="sm:grid sm:grid-auto-fit-xs gap-8">
          {roomTypeList.map((room, index) => (
            <div key={index} className="shadow-2xl p-2">
              <p>
                <span className="font-bold"> Room Type:-</span> {room.title}
              </p>
              <p>
                <span className="font-bold"> Room Description:-</span>{" "}
                {parse(room.description)}
              </p>
              <p>
                <span className="font-bold">Total Rooms:-</span>{" "}
                {room.totalRooms}
              </p>
              <p>
                <span className="font-bold">Available Rooms:-</span>{" "}
                {room.availableRooms}
              </p>
              <p>
                <span className="font-bold">Room Price:- </span>
                {room.basePrice}
              </p>
              <p>
                <span className="font-bold">Images:-</span>{" "}
                {room.roomImages.length}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center my-3">
        <button className="btn-yellow " onClick={submitHotelDetails}>
          Add Hotel
        </button>
      </div>
      {/* <button onClick={() => console.log(roomTypeList)}>Show RoomTypes</button>
      <button onClick={showHotel}>Show Hotel Details</button> */}
    </Base>
  );
};
