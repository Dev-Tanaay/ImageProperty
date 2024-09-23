import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaListAlt,FaUser } from 'react-icons/fa';


const Summary = () => {

  const [totalAmount, settotalAmount] = useState(0);
  const [totalList, settotalList] = useState(0);
  const [totalUser, settotalUser] = useState(0);

  const getPayment = async () => {
    try {
      const response = await fetch("/api/admin/pay");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      settotalAmount(data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const getListing = async () => {
    try {
      const response = await fetch("/api/admin/list");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      settotalList(data.totalListings);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      settotalUser(data.totalUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayment();
    getListing();
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto -mt-32">

      <div className="w-60 h-40 bg-yellow-500 rounded-lg shadow-lg flex flex-col justify-center items-center text-white">
        <FaUser size={40} className="mb-4" />
        <p className="text-lg">Number Of Users</p>
        <p className="text-2xl font-semibold">{totalUser}</p>
      </div>

      <div className="w-60 h-40 bg-green-500 rounded-lg shadow-lg flex flex-col justify-center items-center text-white ml-8">
        <FaMoneyBillWave size={40} className="mb-4" />
        <p className="text-lg">Account</p>
        <p className="text-2xl font-semibold">₹ {parseFloat((totalAmount).toFixed(2))}</p>
      </div>

      <div className="w-60 h-40 bg-blue-500 rounded-lg shadow-lg flex flex-col justify-center items-center text-white ml-8">
        <FaListAlt size={40} className="mb-4" />
        <p className="text-lg">Listing</p>
        <p className="text-2xl font-semibold">{totalList} Listing</p>
      </div>
    </div>
  );
};

export default Summary;
