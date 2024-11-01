import Image from "next/image";

const Profile = ({ image, session }) => {
  return (
    <div className="h-[42px] w-[207px] flex items-center space-x-4">
      <div className="relative">
        <Image
          src={image}
          alt="profile"
          width={42}
          height={42}
          className="rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-white rounded-full"></span>
      </div>
      <div>
        <p className="font-semibold capitalize">
          {session?.data?.user?.name || "Name"}
        </p>
        <p className="text-yellow-500 font-semibold text-[12px]">
          {session?.data?.user?.role || "Role"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
