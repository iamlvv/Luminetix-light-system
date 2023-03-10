import React from "react";
import control_icon from "../images/Control-icon.png";
import control_enable_icon from "../images/Control-enable-icon.png";
import home_icon from "../images/Home-icon.png";
import home_enable_icon from "../images/Home-enable-icon.png";
import users_icon from "../images/Users-icon.png";
import users_enable_icon from "../images/Users-enable-icon.png";
import manual_icon from "../images/Manual-icon.png";
import manual_enable_icon from "../images/Manual-enable-icon.png";
import statistics_icon from "../images/Statistics-icon.png";
import statistics_enable_icon from "../images/Statistics-enable-icon.png";
import exiticon from "../images/exit.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isActiveHome, setisActiveHome] = React.useState(false);
  const [isActiveControl, setisActiveControl] = React.useState(false);
  const [isActiveUsers, setisActiveUsers] = React.useState(false);
  const [isActiveManual, setisActiveManual] = React.useState(false);
  const [isActiveStatistics, setisActiveStatistics] = React.useState(false);

  return (
    <div className="flex-col gap-9 flex w-28 float-left items-center z-40 fixed">
      <div className="mt-10">
        <h1>J</h1>
      </div>
      <div className="flex-col gap-9 flex mt-36">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? setisActiveHome(true) : setisActiveHome(false)
          }
        >
          <div>
            {isActiveHome ? (
              <img src={home_enable_icon} alt="home" />
            ) : (
              <img src={home_icon} alt="home" />
            )}
          </div>
        </NavLink>
        <NavLink
          to="/manualcontrol"
          className={({ isActive }) =>
            isActive ? setisActiveControl(true) : setisActiveControl(false)
          }
        >
          <div>
            {isActiveControl ? (
              <img src={control_enable_icon} alt="control" />
            ) : (
              <img src={control_icon} alt="control" />
            )}
          </div>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? setisActiveUsers(true) : setisActiveUsers(false)
          }
        >
          <div>
            {isActiveUsers ? (
              <img src={users_enable_icon} alt="users" />
            ) : (
              <img src={users_icon} alt="users" />
            )}
          </div>
        </NavLink>
        <NavLink
          to="/manualcontrol"
          className={({ isActive }) =>
            isActive ? setisActiveManual(true) : setisActiveManual(false)
          }
        >
          <div>
            {isActiveManual ? (
              <img src={manual_enable_icon} alt="manual" />
            ) : (
              <img src={manual_icon} alt="manual" />
            )}
          </div>
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive
              ? setisActiveStatistics(true)
              : setisActiveStatistics(false)
          }
        >
          <div>
            {isActiveStatistics ? (
              <img src={statistics_enable_icon} alt="statistics" />
            ) : (
              <img src={statistics_icon} alt="statistics" />
            )}
          </div>
        </NavLink>
      </div>
      <NavLink>
        <div className="mt-28">
          <img src={exiticon} alt="statistics" />
        </div>
      </NavLink>
    </div>
  );
};

export default NavBar;
