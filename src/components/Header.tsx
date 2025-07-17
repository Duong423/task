import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { logOut } = useAuthStore((state) => state);
  const navigate = useNavigate();
  return (
    <header className="bg-blue-500 text-white p-4 w-full flex justify-between items-center">
      <h1 className="text-lg font-bold">Task App</h1>
      <div className="flex items-center space-x-4 justify-center">
        
          <nav className="flex space-x-4">
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive
                  ? "underline font-bold text-white "
                  : "hover:underline text-white"
              }
            >
              Tasks
            </NavLink>
            <NavLink
              to="/my-tasks"
              className={({ isActive }) =>
                isActive
                  ? "underline font-bold text-white"
                  : "hover:underline text-white"
              }
            >
              My Tasks
            </NavLink>
            <NavLink to="/create-task" className="hover:underline text-white">
              Create Task
            </NavLink>
            <button
            className="bg-red-600"
              onClick={() => {
                logOut();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </nav>
        
      </div>
    </header>
  );
};

export default Header;
