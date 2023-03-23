import React from "react";
import NavBar from "../components/NavBar";
import lighticon from "../images/lighticon.png";
import humidityicon from "../images/humidityicon.png";
import temperatureicon from "../images/temperatureicon.png";
import StatisticsSum from "../components/statistics/StatisticsSum";
import Header from "../components/Header";
import RealtimeStatus from "../components/RealtimeStatus";
export default function Statistics() {
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
  const [datatypes, setDatatypes] = React.useState('temperature');

  const handleChooseTemp = () => {
    setDatatypes('temperature');
  }
  const handleChooseHumid = () => {
    setDatatypes('humidity');
  }
  const handleChooseLight = () => {
    setDatatypes('light');
  }
  const handleChooseTime = () => {
    setDatatypes('time');
  }
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="ml-28 grid grid-cols-4 gap-9">
        <div className="col-span-3 bg-violet-100 mt-5 rounded-2xl p-5">
          <Header />
          <div className="grid grid-cols-3 mt-10 gap-9">
            <div className="col-span-1 bg-white rounded-2xl text-center p-5">
                <h1 className="text-xl text-violet-500 font-bold mt-5">Total time the lights have been active</h1>
                <div className="grid grid-cols-2 leading-9 mt-10">
                    <h1 className="italic text-3xl text-red-500 font-bold">18h54p</h1>
                    <h2 className="text-green-500">12%</h2>
                </div>
                <h2 className="text-gray-500 mt-10">
                The data is calculated and compared with data of the previous period
                </h2>
            </div>
            <div className="col-span-2 bg-white rounded-2xl text-center p-5">
                <h1 className="text-xl text-violet-500 font-bold mt-5">Average figures</h1>
                <h2 className="text-gray-500 mt-5">{today}</h2>
                <div className="grid grid-cols-2 gap-12 mt-5">
                    <div className="flex flex-row justify-between leading-8 ml-10 mr-10">
                        <div><img src={temperatureicon} alt='tempicon'/></div>
                        <h1>Temperature</h1>
                        <h1 className="text-2xl text-red-500 font-bold italic">31.2</h1>
                    </div>
                    <div className="flex flex-row justify-between leading-8 ml-10 mr-10">
                        <div><img src={humidityicon} alt='humidicon'/></div>
                        <h1>Humidity</h1>
                        <h1 className="text-2xl text-blue-500 font-bold italic">75.27%</h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-5 leading-8 mr-40 ml-40">
                    <div><img src = {lighticon} alt='lighticon'/></div>
                    <h1>Light</h1>
                    <h1 className="text-2xl text-yellow-500 font-bold italic">52.46%</h1>
                </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl mt-10 p-5">
            <div className="grid grid-cols-4">
                <h1 className="col-span-1 text-xl text-violet-500 font-bold">Statistics</h1>
                <div className="grid grid-cols-4 col-span-3 gap-9">
                    <button className="text-red-500 font-bold hover:bg-red-100 transition ease-in px-2 py-2 rounded-2xl" onClick = {handleChooseTemp}>Temperature</button>
                    <button className="text-blue-500 font-bold hover:bg-blue-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseHumid}>Humidity</button>
                    <button className="text-yellow-500 font-bold hover:bg-yellow-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseLight}>Light</button>
                    <button className="text-pink-500 font-bold hover:bg-pink-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseTime}>Lamp Operating Time</button>
                </div>
            </div>
            <div className="mt-10 ml-5">
                <StatisticsSum typeofstats={datatypes}/>
            </div>
            <div className="text-center">
                <button className="text-violet-500 font-bold hover:bg-violet-100 transition ease-in px-3 py-2 rounded-2xl">Export chart</button>
                
            </div>
          </div>
        </div>
        <div className="mr-9">
          <div className="border-2 p-2 rounded-2xl grid grid-cols-3 gap-5 mt-5 text-violet-500 font-bold text-center">
            <button className="hover:bg-violet-100 px-2 py-2 rounded-2xl transition ease-in">Day</button>
            <button className="hover:bg-violet-100 px-2 py-2 rounded-2xl transition ease-in">Week</button>
            <button className="hover:bg-violet-100 px-2 py-2 rounded-2xl transition ease-in">Month</button>
          </div>
          <h1 className="text-2xl font-bold text-violet-500 mt-10 mb-5">Export Data</h1>
          <h2 className="text-gray-500">Please select the time before you export data</h2>
          <h2 className="text-gray-500">Downloaded data including parameters and chart</h2>
          <div className="text-center mt-10">
            <button className="bg-violet-500 text-white py-2 w-full rounded-2xl font-bold hover:bg-violet-700">Export</button>
          </div>
          <RealtimeStatus />
        </div>
      </div>
    </div>
  );
}
