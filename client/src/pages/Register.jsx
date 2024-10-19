import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { registerUser } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setregisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    employeeSize: "",
  });

  const onChangeInput = (event) => {
    const { id, value } = event.target;

    setregisterData({
      ...registerData,
      [id]: value,
    });
  };

  const onSubmitregisterDetails = (event) => {
    event.preventDefault();
    dispatch(registerUser(registerData )).then((response) => {
      if(response?.payload?.status==="success"){
        navigate("/auth/verify");
      }
    });
  };

  return (
    <form
      className="w-[30%] border border-yellow-400 px-10 py-7 rounded-md"
      onSubmit={onSubmitregisterDetails}
    >
      <div className="text-center">
        <h1 className="text-lg font-bold">Sign Up</h1>
        <p className="font-thin">Lorem ipsum dolor sit amet </p>
      </div>

      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <CgProfile className="mx-4 text-lg" />
        <input
          type="text"
          className="w-full h-full outline-none"
          placeholder="Name"
          onChange={onChangeInput}
          id="name"
          name="name"
          value={registerData.name}
          required
        />
      </div>

      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <FaPhoneAlt className="mx-4 text-lg" />
        <input
          type="text"
          className="w-full h-full outline-none"
          placeholder="Phone"
          onChange={onChangeInput}
          id="phone"
          name="phone"
          value={registerData.phone}
          required
        />
      </div>

      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <CgProfile className="mx-4 text-lg" />
        <input
          type="text"
          className="w-full h-full outline-none"
          placeholder="Company"
          onChange={onChangeInput}
          id="companyName"
          name="companyName"
          value={registerData.companyName}
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
          value={registerData.password}
          required
        />
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
          value={registerData.email}
          required
        />
      </div>

      <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
        <MdGroups className="mx-4 text-lg" />
        <input
          type="text"
          className="w-full h-full outline-none"
          placeholder="Employee Size"
          onChange={onChangeInput}
          id="employeeSize"
          name="employeeSize"
          value={registerData.employeeSize}
          required
        />
      </div>
      <p className="text-center text-sm mb-4">
        By clicking on proceed you wil accept our Terms & Conditions
      </p>

      <div className="my-4 flex gap-3">
        <p className="text-xs md:text-lg">Already have an account? </p>
        <Link to="/auth/login" className="text-xs md:text-lg">
          Login here
        </Link>
      </div>
      <button type="submit" className="w-full bg-black text-white">
        Proceed
      </button>
    </form>
  );
}

export default Register