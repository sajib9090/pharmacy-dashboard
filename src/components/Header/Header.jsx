import Image from "next/image";
import defaultLogo from "../../assets/logo/png-transparent-blue-capsule-com-removebg-preview.png";

const Header = () => {
  return (
    <div className="h-[80px] hidden sm:hidden md:hidden lg:flex">
      <div className="bg-slate-200 w-[256px] flex items-center justify-between px-10 shadow">
        <div>
          <Image src={defaultLogo} alt="logo" width={50} height={50} />
        </div>
        <div>
          <p className="">Pharma Name</p>
        </div>
      </div>
      <div className="bg-[#F7FAFD] flex-grow shadow border-b border-[#d6d5d5]">
        <h1>up bar</h1>
      </div>
    </div>
  );
};

export default Header;
