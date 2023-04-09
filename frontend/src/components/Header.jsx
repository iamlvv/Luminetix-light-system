import React, { useEffect, useState } from 'react'
import Clock from "react-live-clock";
import fan from "../images/Fan.png";
import feedback from "../images/feedback-line.png";
import moon1 from "../images/moon1.png";
import avatar from "../images/avatardefault1.png";
import lamp from "../images/Lamp_light.png";
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from "../redux/actions/userActions";
import clockicon from "../images/clock.png";

export default function Header() {
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
    <div className="grid grid-cols-3 gap-9">
      <div className="grid grid-cols-2 bg-white rounded-2xl shadow-sm">
        <img src={avatar} alt="avatar" className="w-1/2 mx-auto my-auto h-auto" />
        <h1 className="my-auto text-2xl font-bold">Hello, {name}!</h1>
      </div>
      <div className="grid grid-cols-4 bg-white rounded-2xl p-5">
        <div className="hover:bg-violet-50 transition ease-in rounded-2xl">
          <img src={lamp} alt="lamp" className="mx-auto my-3" />
        </div>
        <div className="hover:bg-violet-50 transition ease-in rounded-2xl">
          <img src={fan} alt="fan" className="mx-auto my-3" />
        </div>
        <div className="hover:bg-violet-50 transition ease-in rounded-2xl">
          <img src={feedback} alt="feedback" className="mx-auto my-3" />
        </div>
        <div className="hover:bg-violet-50 transition ease-in rounded-2xl">
          <img src={moon1} alt="moon1" className="mx-auto my-4" />
        </div>
      </div>
      {/* <div className="text-center bg-white rounded-2xl my-auto py-5 font-bold text-xl text-violet-500">
        <h1 className="">{today}</h1>
        <div>
          <Clock format={"HH:mm"} ticking={true} />
        </div>
      </div> */}
      <div className="bg-white rounded-2xl shadow-sm grid grid-cols-2 px-3 py-5">
        <img src={clockicon} alt="clockicon" className="w-1/2 mx-auto my-auto h-auto col-span-1" />
        <div className="grid grid-rows-2 text-violet-700 font-bold">
          <div className="text-2xl row-span-1 ">
            <Clock format={"HH:mm:ss"} ticking={true} />
          </div>
            <h1 className="text-sm">{today}</h1>
        </div>
      </div>
    </div>
  )
}
