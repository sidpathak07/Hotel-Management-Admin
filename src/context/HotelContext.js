import { createContext, useState } from "react";

export const HotelManagementContext = createContext();

export const HotelManagementProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return {
      name: "",
      email: "",
      isVerifiedEmail: Boolean,
      role: "",
      phoneno: "",
      bookings: null,
      token: "",
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
  const [showAdminSettingsMenu, setShowAdminSettingsMenu] = useState(
    () => true
  );
  return (
    <HotelManagementContext.Provider
      value={{
        user,
        setUser,
        searchData,
        setSearchData,
        bookingData,
        setBookingData,
        showAdminSettingsMenu,
        setShowAdminSettingsMenu,
      }}
    >
      {children}
    </HotelManagementContext.Provider>
  );
};
