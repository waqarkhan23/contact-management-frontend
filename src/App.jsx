import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/verify", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        toast.error(error.response.data.errors[0].msg);
      }
    };
    verifyToken();
  }, []);
  return (
    <>
      <NavBar />
      <div className="pt-14">
        <Outlet />
      </div>
    </>
  );
}

export default App;
