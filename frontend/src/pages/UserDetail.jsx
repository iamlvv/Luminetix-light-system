import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

export default function UserDetail() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch2 = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails("profile"));
    }
  }, []);
  useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setEmail(user.email);
      setPhone(user.phone);
      setUserName(user.username);
    }
  }, [dispatch2, user]);
  return (
    <div>
      <NavBar />
      <div className="ml-28">
        <h1 className="uppercase text-2xl font-bold pt-5">My Profile</h1>
        <div className="bg-violet-100 mr-10 rounded-2xl mt-5 p-5">
          <div>
            <h1 className="font-bold text-2xl mb-5 uppercase">{fullName}</h1>
            <div>{/*Location*/}</div>
            <div className="grid grid-cols-3">
              <fieldset className="col-span-2">
                <legend className="text-center text-gray-600 font-bold">PERSONAL INFORMATION</legend>
                <div>
                  <div className="grid grid-cols-2 gap-9 uppercase text-gray-500">
                    <label className="ml-3">Fullname</label>
                    
                  </div>
                  <div className="grid grid-cols-2 gap-9">
                    <input
                      type="text"
                      name="fullname"
                      placeholder="John"
                      className="py-2 px-3 rounded-xl mt-5"
                      value={fullName || ""}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    
                  </div>
                </div>
                <div className="mt-5 uppercase text-gray-500">
                  <label className="ml-3">Username</label>
                  <div className="grid grid-cols-2 gap-9">
                    <input
                      type="text"
                      name="username"
                      placeholder="JohnDoe"
                      className="py-2 px-3 rounded-xl mt-5"
                      value={userName || ""}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="grid grid-cols-3 mt-5">
              <fieldset className="col-span-2">
                <legend className="text-center text-gray-600 font-bold">CONTACT INFORMATION</legend>
                <div className="uppercase text-gray-500">
                  <div>
                    <label className="ml-3">Email Address</label>
                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="johdoe@gmail.com"
                        className="w-full py-2 px-3 rounded-xl mt-5"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="ml-3">Phone Number</label>
                    <div>
                      <div className="grid grid-cols-2 gap-9">
                        <input
                          type="text"
                          name="phone"
                          placeholder="123456789"
                          className="py-2 px-3 rounded-xl mt-5"
                          value={phone || ""}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="grid grid-cols-3 mt-5">
              <fieldset className="col-span-2">
                <legend className="text-center text-gray-600 font-bold">PASSWORD</legend>
                <div className="uppercase text-gray-500 grid grid-cols-3 gap-9">
                  <div>
                    <label className="ml-3">Current Password</label>
                    <div>
                      <input
                        type="password"
                        name="password"
                        className="w-full py-2 px-3 rounded-xl mt-5"
                        placeholder="1222343"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="ml-3">New Password</label>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        placeholder="123456789"
                        className="w-full py-2 px-3 rounded-xl mt-5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="ml-3">Confirm New Password</label>
                    <div>
                      <input
                        type="password"
                        name="password"
                        className="w-full py-2 px-3 rounded-xl mt-5"
                        placeholder="1222343"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div>
                <button className="bg-violet-500 text-white py-2 px-3 rounded-xl mt-5 hover:bg-violet-600 transition ease-in">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
