import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { useContext } from "react";
import { Home } from "./pages/Home";
import { HotelList } from "./pages/HotelList";
import { Signup } from "./pages/Signup";
import { HotelManagementContext } from "./context/HotelContext";
import { isAuthenticated } from "./auth/auth";
import { AdminSettings } from "./pages/AdminSettings";

export const Routees = () => {
  const { user, setUser } = useContext(HotelManagementContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotellist" element={<HotelList />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/adminsettings"
          element={
            isAuthenticated() && isAuthenticated().email ? (
              <AdminSettings />
            ) : (
              <Navigate to={{ pathname: "/signup" }} />
            )
          }
        />
      </Routes>
    </Router>
  );
};
