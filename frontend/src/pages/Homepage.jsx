import React from "react";
import NavBar from "../components/NavBar";
import avatar from "../images/avatardefault.png";
import Clock from "react-live-clock";
import { AiOutlineArrowRight } from "react-icons/ai";
import StatisticsToday from "../components/homepage/StatisticsToday";
import { NavLink } from "react-router-dom";
import NotificationsBar from "../components/homepage/NotificationsBar";
import FrequentlyUsedDevices from "../components/homepage/FrequentlyUsedDevices";

const HomePage = () => {
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
          <div className="grid grid-cols-2 gap-9">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="grid grid-cols-2">
                <img src={avatar} alt="profile" className="w-1/2 mx-auto" />
                <div className="mt-10">
                  <h1 className="font-bold text-2xl">Hi John !</h1>
                  <h2 className="text-gray-500 text-xs">
                    Control your device from here
                  </h2>
                </div>
              </div>
              <div className="flex flex-col text-left font-bold ml-10 mt-5 mb-5">
                <div>
                  <button className="bg-violet-300 rounded-2xl py-1 w-48 hover:bg-violet-400 transition ease-in">
                    Change your password
                  </button>
                </div>
                <div className="mt-3">
                  <button className="bg-violet-300 rounded-2xl py-1 px-4 w-48 hover:bg-violet-400 transition ease-in">
                    Change your email
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="text-4xl w-1/2 mx-auto mt-10 mb-5 text-violet-700 font-bold">
                <div className="mb-5 ">
                  <Clock format={"HH:mm"} ticking={true} />
                </div>
                <h1>{today}</h1>
              </div>
              <div className="">
                <h1 className="font-bold text-xl w-1/2 mx-auto mb-5">
                  Your home
                </h1>
                <div className="w-1/2 mx-auto text-gray-500">
                  <div className="grid grid-cols-2">
                    <h2>1</h2>
                    <h2>10</h2>
                  </div>
                  <div className="grid grid-cols-2">
                    <h2>In actived</h2>
                    <h2>Devices</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-10">
            <FrequentlyUsedDevices/>
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
          <NotificationsBar/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
