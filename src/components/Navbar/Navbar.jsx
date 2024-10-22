"use client";
import Image from "next/image";
import defaultLogo from "../../assets/logo/png-transparent-blue-capsule-com-removebg-preview.png";
import hamburgerLogo from "../../assets/menu/1564512_burger_catalogue_list_menu_icon.png";
import closeIcon from "../../assets/menu/211651_close_round_icon.png";
import { useState } from "react";
import defaultProfileImage from "../../assets/profile/403022_business man_male_user_avatar_profile_icon.png";
import ProfileWithDropdown from "../ProfileWithDropdown/ProfileWithDropdown";
import Profile from "../Profile/Profile";
import DesktopLink from "../NavLink/DesktopLink/DesktopLink";
import MobileLink from "../NavLink/DesktopLink/MobileLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* large screen */}
      <div className="w-[256px] bg-slate-100 min-h-screen hidden sm:hidden md:hidden lg:block shadow">
        <div className="flex items-center justify-center pt-6">
          <Profile image={defaultProfileImage} />
        </div>
        {/* menu items */}
        <DesktopLink />
      </div>
      {/* small screen */}
      <div className="h-[70px] bg-slate-200 w-full flex sm:flex md:flex lg:hidden">
        <div className="flex items-center justify-between w-full px-4">
          <div>
            <button onClick={handleMenuToggle}>
              <Image src={hamburgerLogo} alt="menu" width={35} height={35} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <Image src={defaultLogo} alt="logo" width={50} height={50} />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-semibold">Pharma Name</p>
            </div>
          </div>
          <div>
            <ProfileWithDropdown image={defaultProfileImage} />
          </div>
        </div>
      </div>

      {/* Full-screen menu overlay with animation */}
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-90 z-50 flex flex-col transform transition-transform duration-500  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Image src={defaultLogo} alt="logo" width={50} height={50} />
            <p className="text-white text-xl font-bold">Pharma Name</p>
          </div>
          <button onClick={handleMenuToggle}>
            <Image src={closeIcon} alt="close" width={30} height={30} />
          </button>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center space-y-4 text-white">
          <MobileLink />
        </div>
      </div>
    </>
  );
};

export default Navbar;
