import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routees } from "./Routees";
import { HotelManagementProvider } from "./context/HotelContext";

function App() {
  return (
    <HotelManagementProvider>
      <Routees />
    </HotelManagementProvider>
  );
}

export default App;
