"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const ProfileWithDropdown = ({ image, session }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <Image
          src={image}
          alt="profile"
          width={42}
          height={42}
          className="rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-white rounded-full"></span>
      </div>

      {dropdownOpen && (
        <div className="absolute mt-2 w-[150px] bg-white border border-gray-200 rounded shadow-lg z-10 right-1">
          <div className="py-2 px-4">
            <p className="font-semibold capitalize">
              {session?.data?.user?.name || "Name"}
            </p>
            <p className="text-yellow-500 font-semibold text-[12px]">
              {session?.data?.user?.role || "Role"}
            </p>
          </div>

          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li
              onClick={() => signOut()}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileWithDropdown;
