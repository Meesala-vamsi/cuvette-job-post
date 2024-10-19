import React, { useState } from 'react'
import { CiMail } from 'react-icons/ci';
import { FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { verifyEmailOTP } from '../../store/slices/authSlice';

const Verify = () => {
  const [verificationData, setVerificationData] = useState({
    enteredEmailOTP:""
  });
  const dispatch = useDispatch()

  const onChangeInput=(event)=>{
    const { id, value } = event.target;

    setVerificationData({
      ...verificationData,
      [id]: value,
    });
  }

  const onClickVerifyEmail=()=>{
    dispatch(verifyEmailOTP(verificationData.enteredEmailOTP))
  }

  return (
    <div className="w-[30%] border border-yellow-400 px-10 py-7 rounded-md">
      <div className="text-center">
        <h1 className="text-lg font-bold">Sign Up</h1>
        <p className="font-thin">Lorem ipsum dolor sit amet </p>
      </div>
      <div>
        <div className="border my-4 border-gray-200 flex items-center h-9 rounded-md">
          <CiMail className="mx-4 text-lg" />
          <input
            type="text"
            className="w-full h-full outline-none"
            placeholder="Email OTP"
            onChange={onChangeInput}
            id="enteredEmailOTP"
            name="enteredEmailOTP"
            value={verificationData.enteredEmailOTP}
            required
          />
        </div>
        <button
          className="bg-black h-8 p-0 text-white w-full"
          onClick={onClickVerifyEmail}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Verify