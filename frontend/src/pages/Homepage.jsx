import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import avatar from "../images/avatardefault1.png";
import Clock from "react-live-clock";
import clockicon from "../images/clock.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import StatisticsToday from "../components/homepage/StatisticsToday";
import { NavLink } from "react-router-dom";
import NotificationsBar from "../components/homepage/NotificationsBar";
import FrequentlyUsedDevices from "../components/homepage/FrequentlyUsedDevices";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

const HomePage = () => {
  //Get user Info
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch2 = useDispatch();
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails("profile"));
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (user) {
      setName(user.fullname);
    }
  }, [dispatch2, user]);

  // Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  switch (mm) {
    case "01":
      mm = "Jan";
      break;
    case "02":
      mm = "Feb";
      break;
    case "03":
      mm = "Mar";
      break;
    case "04":
      mm = "Apr";
      break;
    case "05":
      mm = "May";
      break;
    case "06":
      mm = "Jun";
      break;
    case "07":
      mm = "Jul";
      break;
    case "08":
      mm = "Aug";
      break;
    case "09":
      mm = "Sep";
      break;
    case "10":
      mm = "Oct";
      break;
    case "11":
      mm = "Nov";
      break;
    case "12":
      mm = "Dec";
      break;
    default:
      mm = "Jan";
  }
  today = mm + ", " + dd + ", " + yyyy;

  return (
    <div className="">
      <div className="">
        <NavBar />
      </div>
      <div className="grid grid-cols-4 ml-28 mb-5">
        <div className="col-span-3 bg-violet-100 rounded-2xl mt-5 p-8">
          <div className="grid grid-cols-2 gap-5">
            {/* Avatar */}
            <div className="bg-white rounded-2xl shadow-sm grid grid-cols-2 px-2 py-5">
              <img src={avatar} alt="avatar" className="w-1/2 mx-auto my-auto h-auto col-span-1" />
              <div className="grid grid-rows-2">
                <div className="my-auto mr-auto">
                  <h1 className="my-auto text-2xl font-bold">Hello, {name}!</h1>
                  {/* <h2 className="text-gray-500 text-xs">
                    Control your device from here
                  </h2> */}
                </div>
                <NavLink to='/userdetail'>
                  <button className="bg-violet-300 rounded-2xl font-semibold py-2 w-48 hover:text-white hover:bg-violet-400 transition ease-in">
                    Edit your profile
                  </button>
                </NavLink>
              </div>
            </div>
            {/* Clock */}
            <div className="bg-white rounded-2xl shadow-sm grid grid-cols-2 px-2 py-5">
              <img src={clockicon} alt="clockicon" className="w-1/2 mx-auto my-auto h-auto col-span-1" />
              <div className="grid grid-rows-2 text-violet-700 font-bold">
                <div className="mb-3 text-4xl row-span-1 ">
                  <Clock format={"HH:mm:ss"} ticking={true} />
                </div>
                <h1 className="text-xl">{today}</h1>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-10">
            <FrequentlyUsedDevices />
          </div>
          <div>
            <div className="grid grid-cols-2 mb-10">
              <h1 className="text-xl font-bold">Statistics today</h1>
              <NavLink to="/statistics">
                <div className="text-right text-violet-700">
                  <h2>
                    More statistics <AiOutlineArrowRight className="inline" />
                  </h2>
                </div>
              </NavLink>
            </div>
            <div>
              <StatisticsToday />
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-10 p-5">
          <NotificationsBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
