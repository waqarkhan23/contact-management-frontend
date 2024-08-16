import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
const Dashboard = () => {
  return (
    <>
      <>
        <SideBar />
        <div className=" sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <Outlet />
          </div>
        </div>
      </>
    </>
  );
};

export default Dashboard;
