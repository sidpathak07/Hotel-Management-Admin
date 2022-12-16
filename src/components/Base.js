import React from "react";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";
export const Base = ({ children }) => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      {children}
    </div>
  );
};
