import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { notificationList, notiList } from "../../redux/actions/notificationActions";
import { getUserDetails } from "../../redux/actions/userActions";
import axios from "axios";
import Swal from "sweetalert2";
const itemsNoti = (list) => {
  return list.slice(0).reverse().map((index) => (
    <div className="grid grid-cols-4 mb-5 shadow-xl rounded-2xl p-3" key={index._id}>
      <div className="col-span-3">
        <h1 className="font-bold text-lg">{index.name}</h1>
        <h2 className="text-gray-500 text-sm">{index.message}</h2>
      </div>
      <div className="text-right font-bold mt-7">
        <h1>{new Date(index.created_date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit"
        })}</h1>
      </div>
    </div>
  ));
};

const style = {
  height: "570px",
}

export default function NotificationsBar() {
  const dispatch = useDispatch();
  const [notificationlist, setNotificationList] = React.useState([]); // Initialize notificationlist with empty array

  // get user Info
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
  //If user exists, get user.notification and set into notificationlist state
  const getNotificationList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`http://localhost:5000/api/users/noti`, config);
    const { notifications } = data;
    setNotificationList(notifications);
  }
  useEffect(() => {
    if (user) {
      getNotificationList()
    }
  }, [dispatch2, user]);

  const [filteredList, setFilteredList] = React.useState(notificationlist);

  const handleFilterAlerts = () => {
    setFilteredList(notificationlist.filter((item) => item.type === "alert"));
  };
  const handleFilterContext = () => {
    setFilteredList(notificationlist.filter((item) => item.type === "context"));
  };
  const handleShowAll = () => {
    setFilteredList(notificationlist);
  };
  const handleDeleteAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        axios.delete(`http://localhost:5000/api/users/noti`, config);
        setFilteredList([]);
        Swal.fire(
          'Deleted!',
          'Your notifications has been deleted.',
          'success'
        )
      }
    })

  };
  return (
    <div>
      <div className="grid grid-cols-3">
        <h1 className="text-2xl font-bold col-span-2">Notifications</h1>
        <button className="bg-red-300 font-bold rounded-2xl py-1 hover:bg-red-400 transition ease-in"
          onClick={handleDeleteAll}>
          Delete all
        </button>
      </div>
      <h2 className="text-gray-500 mt-5 mb-5">
        You can keep track of what has happened right here.
      </h2>
      <div className="grid grid-cols-3 gap-9">
        <button
          className="bg-gray-500 rounded-2xl py-1 font-bold text-white hover:bg-gray-600 transition ease-in"
          onClick={handleShowAll}
        >
          All
        </button>
        <button
          className="bg-red-500 rounded-2xl py-1 font-bold text-white hover:bg-red-600 transition ease-in"
          onClick={handleFilterAlerts}
        >
          Alerts
        </button>
        <button
          className="bg-green-500 font-bold py-1 rounded-2xl hover:bg-green-600 transition ease-in"
          onClick={handleFilterContext}
        >
          Context
        </button>
      </div>
      <div className="mt-5 overflow-y-auto" style={style}>{itemsNoti(filteredList)}</div>
    </div>
  );
}
