import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../src/store/store";
import Profile from "./pages/Profile.jsx";
import EditContact from "./pages/EditContact.jsx";
import ProtectedRoutes from "./utils/protectedRoutes.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";

(async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get("http://localhost:5000/api/verify", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    dispatch(setUser(res.data));
  } catch (err) {
    console.log(err);
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/Dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }>
              <Route index element={<Contacts />} />
              <Route path="addcontact" element={<AddContact />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-contact/:id" element={<EditContact />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
