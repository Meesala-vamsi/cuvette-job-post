import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

  const onChangeInput=(event)=>{
    const { id, value } = event.target;

    setLoginData({
      ...loginData,
      [id]: value,
    });
  }


  const onSubmitLoginData=(event)=>{
    event.preventDefault();
    dispatch(loginUser(loginData))
    .then((response)=>{
      console.log(response)
      if(response?.payload?.status==="success"){
        toast.success(response?.payload?.message);
      }else{
        toast.error(response?.payload?.message);
      }
    })
  }
  return (
    <form
      onSubmit={onSubmitLoginData}
      className="w-[30%] border border-yellow-400 px-10 py-7 rounded-md"
    >
      <div className="text-center">
        <h1 className="text-lg font-bold">Sign In</h1>
        <p className="font-thin">Lorem ipsum dolor sit amet </p>
      </div>
      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <CiMail className="mx-4 text-lg" />
        <input
          type="email"
          className="w-full h-full outline-none"
          placeholder="Email"
          onChange={onChangeInput}
          id="email"
          name="email"
          value={loginData.email}
          required
        />
      </div>

      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <RiLockPasswordLine className="mx-4 text-lg" />
        <input
          type="password"
          className="w-full h-full outline-none"
          placeholder="Password"
          onChange={onChangeInput}
          id="password"
          name="password"
          value={loginData.password}
          required
        />
      </div>
      <div className="my-4 flex gap-1 md:gap-3">
        <p className="text-xs md:text-lg">Dont have an account? </p>
        <Link to="/auth/register" className="text-xs md:text-xl">
          Create Account
        </Link>
      </div>
      <button type="submit" className="w-full bg-black text-white">
        Login
      </button>
    </form>
  );
}

export default Login