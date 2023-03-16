import React, { useEffect } from "react";
import listOfNoti from "../../mockdata/Notifications";

const itemsNoti = (list) => {
  return list.map((index) => (
    <div className="grid grid-cols-4 mb-5 shadow-xl rounded-2xl p-3">
      <div className="col-span-3">
        <h1 className="font-bold text-lg">{index.type}</h1>
        <h2 className="text-gray-500 text-sm">{index.content}</h2>
      </div>
      <div className="text-right font-bold mt-7">
        <h1>{index.date}</h1>
      </div>
    </div>
  ));
};
export default function NotificationsBar() {
  const [filteredList, setFilteredList] = React.useState(listOfNoti);

  const handleFilterAlerts = () => {
    setFilteredList(listOfNoti.filter((item) => item.type === "Alerts"));
  };
  const handleFilterContext = () => {
    setFilteredList(listOfNoti.filter((item) => item.type === "Context"));
  };
  const handleShowAll = () => {
    setFilteredList(listOfNoti);
  };
  const handleDeleteAll = () => {
    setFilteredList([]);
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
      <div className="mt-5">{itemsNoti(filteredList)}</div>
    </div>
  );
}
