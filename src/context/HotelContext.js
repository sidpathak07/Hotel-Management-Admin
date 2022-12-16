import { createContext, useState } from "react";

export const HotelManagementContext = createContext();

export const HotelManagementProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return {
      name: "",
      email: "",
      isVerifiedEmail: Boolean,
      role: "",
      bookings: null,
    };
  });
  const [searchData, setSearchData] = useState(() => {
    return {
      searchQuery: "",
      filters: [],
      fromDate: "",
      toDate: "",
      noOfAdults: null,
      noOfChildern: null,
      noOfRooms: null,
    };
  });
  const [bookingData, setBookingData] = useState(() => {
    return {};
  });
  return (
    <HotelManagementContext.Provider
      value={{
        user,
        setUser,
        searchData,
        setSearchData,
        bookingData,
        setBookingData,
      }}
    >
      {children}
    </HotelManagementContext.Provider>
  );
};
