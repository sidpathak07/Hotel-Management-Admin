import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { useContext, useEffect } from "react";
import { Home } from "./pages/Home";
import { HotelList } from "./pages/HotelList";
import { Signin } from "./pages/Signin";
import { HotelManagementContext } from "./context/HotelContext";
import { isAuthenticated } from "./auth/auth";
import { AdminSettings } from "./pages/AdminSettings";
import { ChangeUserStatus } from "./pages/ChangeUserStatus";
import { ChangeUserStatusOne } from "./pages/ChangeUserStatusOne";

export const Routees = () => {
  const { user, setUser } = useContext(HotelManagementContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotellist" element={<HotelList />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/adminsettings">
          <Route
            index
            element={
              isAuthenticated().email ? (
                <AdminSettings />
              ) : (
                <Navigate to={{ pathname: "/signup" }} />
              )
            }
          />
          <Route path="changeuserstatus" element={<ChangeUserStatusOne />} />
        </Route>
      </Routes>
    </Router>
  );
};
