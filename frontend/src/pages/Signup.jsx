import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import footerlogin from '../images/footer-login.png'
import Swal from 'sweetalert2';
import { register } from "../redux/actions/userActions";

export default function Signup() {
    const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Confirm password not matching",
      })
    } else {
      dispatch(register(fullname, username, email, password, phone));
      if(error)
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
    }
  }
  return (
    <div>
        <form className='w-80 mx-auto mt-24 text-center mb-6'
            onSubmit={handleSubmit}
        >
            <h1 className='text-6xl text-violet-500 font-bold '>
                Welcome
            </h1>
            <h2 className='mt-5 mb-5'>
                to our system
            </h2>
            <div>
                <div>
                    <input type="text" placeholder="Full name" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setFullName(e.target.value)}
                required
                    />
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Phone number" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setPhone(e.target.value)}
                required
                    />
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Username" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setUserName(e.target.value)}
                required
                    />
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Email" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setEmail(e.target.value)}
                required
                    />
                </div>
                <div className='mt-5 mb-5'>
                    <input type="password" placeholder="Password" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setPassword(e.target.value)}
                required
                    />
                </div>
                <div className='mt-5 mb-5'>
                    <input type="password" placeholder="Confirm Password" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                required
                    />
                </div>
                <div>
                    <button className='py-2 px-3 bg-violet-500 rounded-2xl text-white hover:bg-violet-600 transition ease-in font-bold w-80'>Sign up</button>
                </div>
                <div className='flex flex-row justify-between ml-10 mr-10'>
                    <div>
                        Already have an account?
                    </div>
                    <NavLink to='/'>
                    <div className='font-bold'>
                        Log in
                    </div>
                    </NavLink>
                    
                </div>
            </div>
        </form>
        <div>
            <img src={footerlogin} alt="footerlogin" className='w-full'/>
        </div>
    </div>
  )
}
