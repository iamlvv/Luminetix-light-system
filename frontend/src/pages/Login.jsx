import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import footerlogin from "../images/footer-login.png";
import { useDispatch, useSelector } from "react-redux";
import { login }  from "../redux/actions/userActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      //navigate('/homepage');
    }
  }, [userInfo, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <div className="">
      <form className="text-center w-80 mx-auto mt-40"
        onSubmit={handleSubmit}
      >
        <h1 className="text-6xl text-violet-500 font-bold ">Login</h1>
        <h2 className="mt-5 mb-5">Let's start our journey!</h2>
        <div>
          <div>
            <input
              type="text"
              placeholder="Email"
              className="py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              placeholder="Password"
              className="py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-9 mt-5 mb-5">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div>
              <div href="#" className="font-bold">
                Forgot password?
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between ml-10 mr-10 mb-5">
            <div>Don't have an account?</div>
            <NavLink to="/signup">
              <div className="font-bold">Sign up</div>
            </NavLink>
          </div>
          <div>
            <button
              className="py-2 px-3 bg-violet-500 rounded-2xl text-white hover:bg-violet-600 transition ease-in font-bold w-80"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="absolute inset-x-0 bottom-0">
        <img src={footerlogin} alt="footerlogin" className="w-full" />
      </div>
    </div>
  );
}
