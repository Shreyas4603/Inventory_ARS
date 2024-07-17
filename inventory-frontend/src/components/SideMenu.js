import React from "react";
import { Link } from "react-router-dom";
import { LucideApple, Inventory, Store, LayoutDashboard, Package2, ShoppingBag, ReceiptIndianRupee } from 'lucide-react';

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between  hidden lg:flex  border-r border-black/10 text-black">
<div className="px-2">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 hover:text-gray-700"
          >
            <LayoutDashboard  size={24} /> {/* Using the Dashboard icon */}
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          {/* Other links with icons */}
          <Link
            to="/inventory"
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
          >
            <Package2 size={24} /> {/* Using the Inventory icon */}
            <span className="text-sm font-medium"> Inventory </span>
          </Link>

          {/* Continue replacing other icons similarly */}
          <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
          >
            <ShoppingBag size={24} /> {/* Using the Shopping Bag icon for Purchase Details */}
            <span className="text-sm font-medium"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
          >
            <ReceiptIndianRupee size={24} /> {/* Using the Shopping Cart icon for Sales */}
            <span className="text-sm font-medium"> Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/manage-store">
                <div className="flex items-center gap-2">
                  <Store size={24} /> {/* Using the Store icon for Manage Store */}
                  <span className="text-sm font-medium"> Manage Store </span>
                </div>
              </Link>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-white/10 text-black">
        <div className="flex items-center gap-2  p-4 ">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span> {localStorageData.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
