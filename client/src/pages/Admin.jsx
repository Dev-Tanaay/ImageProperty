import React from "react";
import { FaDollarSign, FaShoppingCart, FaUser, FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";


const Admin = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen flex">
      <aside className="bg-slate-200 shadow-md text-white w-64 p-5">
        <div className=" text-slate-500 text-2xl font-bold mb-8 underline decoration-3">Welcome <span className="text-slate-700">{currentUser.username}</span></div>
        <nav className="space-y-6">
          <div>
            <ul className="space-y-3 block text-lg font-semibold">
              <Link to={"/admin/users"}>
                <li className=" uppercase text-slate-500">
                  Users
                </li>
              </Link>

              <Link to={"/admin/pay"}>
                <li className=" uppercase text-slate-500">
                  Payment
                </li>
              </Link>

              <Link to={"/admin/summary"}>
                <li className=" uppercase text-slate-500">
                  Summary
                </li>
              </Link>

            </ul>
          </div>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
};

export default Admin;
