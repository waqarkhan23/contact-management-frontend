import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../store/slices/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    dispatch(logout());
    dispatch(setUser(null));
  };

  return (
    <nav className="bg-custom-blue-500 p-4 flex justify-between items-center w-full fixed">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt=""
            height="36px"
            width="36px"
            className="scale-150"
          />
        </Link>
      </div>
      <div className="flex gap-4">
        <Link to="/about">
          <span className="text-white">ABOUT</span>
        </Link>
        {user ? (
          <>
            <Link to="/contacts">
              <span className="text-white">CONTACTS</span>
            </Link>
            <Link to="#">
              <span className="text-white">{user.name}</span>{" "}
            </Link>

            <button>
              <span className="text-white" onClick={handleLogout}>
                LOGOUT
              </span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <span className="text-white">LOGIN</span>
            </Link>
            <Link to="/register">
              <span className="text-white">REGISTER</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
