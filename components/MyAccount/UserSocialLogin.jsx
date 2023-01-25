import Image from "next/image";
import React from "react";

import googleLogo from "images/google-icon.svg";

const UserSocialLogin = ({ user }) => {
  console.log(user);
  return (
    <div className="border px-4 py-2 rounded-md  w-[50%] flex flex-col gap-1 mx-auto ">
      <h1 className="font-bold text-lg text-center">User Info</h1>
      <hr className="mx-auto w-[50%]" />
      <div className="flex flex-row gap-6 mt-3">
        <div className="font-bold text-sm flex flex-row justify-between w-[50px]">
          Name <span>:</span>{" "}
        </div>
        <div className="text-sm capitalize">
          {user?.firstname || "first name"} {user?.lastname || "last name"}
        </div>
      </div>

      <div className="flex flex-row gap-6 ">
        <div className="font-bold text-sm flex flex-row justify-between  w-[50px]">
          Email <span>:</span>
        </div>
        <div className="text-sm">{user?.email || "example@email.com"}</div>
      </div>
      <div className="border p-3 w-[40%] mt-2 rounded-md flex flex-row justify-between items-center text-xs mx-auto font-bold hover:bg-gray-300 cursor-pointer">
        <div className="relative h-5 w-5">
          <Image
            src={googleLogo}
            alt="google-logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        Login by Google
      </div>
    </div>
  );
};

export default UserSocialLogin;
