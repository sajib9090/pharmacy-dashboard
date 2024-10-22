import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiDocumentReport } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { ImHome3 } from "react-icons/im";
import { GiSellCard } from "react-icons/gi";

const MobileLink = () => {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <Link
        href={"/"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg ${
          pathname === "/" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <ImHome3 />
        <p>Home</p>
      </Link>
      <Link
        href={"/dashboard"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg ${
          pathname === "/dashboard" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <MdSpaceDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        href={"/sell"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg ${
          pathname === "/sell" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <GiSellCard />
        <p>Sell</p>
      </Link>
      <Link
        href={"/reports"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg ${
          pathname === "/reports" ? " bg-[#009099] text-white " : "text-black"
        }`}
      >
        <HiDocumentReport />
        <p>Reports</p>
      </Link>
    </div>
  );
};

export default MobileLink;
