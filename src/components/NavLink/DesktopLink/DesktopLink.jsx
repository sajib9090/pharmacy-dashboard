import { MdSpaceDashboard } from "react-icons/md";
import { ImHome3 } from "react-icons/im";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSellCard } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { TbLogin2 } from "react-icons/tb";
import { FaRegistered } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { signOut, useSession } from "next-auth/react";

const DesktopLink = () => {
  const session = useSession();
  const pathname = usePathname();
  return (
    <div className="pt-10">
      <Link
        href={"/"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          pathname === "/" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <ImHome3 />
        <p>Home</p>
      </Link>
      <Link
        href={"/dashboard"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          pathname === "/dashboard" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <MdSpaceDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        href={"/sell"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          pathname === "/sell" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <GiSellCard />
        <p>Sell</p>
      </Link>
      <Link
        href={"/reports"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          pathname === "/reports" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <HiDocumentReport />
        <p>Reports</p>
      </Link>
      {!session?.data?.user ? (
        <>
          <Link
            href={"/login"}
            className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
              pathname === "/login" ? " bg-[#009099] text-white " : "text-black"
            }`}
          >
            <TbLogin2 />
            <p>Login</p>
          </Link>
          <Link
            href={"/register"}
            className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
              pathname === "/register"
                ? " bg-[#009099] text-white "
                : "text-black"
            }`}
          >
            <FaRegistered />
            <p>Register</p>
          </Link>
        </>
      ) : (
        <button
          onClick={() => signOut()}
          className={`flex w-full items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white text-black
        `}
        >
          <TbLogout2 />
          <p>Logout</p>
        </button>
      )}
    </div>
  );
};

export default DesktopLink;
