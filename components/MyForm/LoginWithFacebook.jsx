import css from "./css/button.module.css";

import facebookLogo from "images/facebook-icon.svg";
import Image from "next/image";
// import { useFacebookLogin } from "facebook-oauth-react";

const LoginWithFacebook = ({ name = "Login" }) => {
  // const login = useFacebookLogin({
  //   onSuccess: async (responseToken) => {
  //     try {
  //       console.log(responseToken);
  //     } catch (error) {
  //       console.error(error);
  //       return;
  //     }
  //   },
  // });

  return (
    <>
      <button
        className={
          "border flex flex-row items-center gap-2 text-xs font-bold p-3 w-full bg-blue-600 text-white rounded-md hover:shadow hover:opacity-80"
        }
      >
        <div className="relative h-5 w-5">
          <Image
            src={facebookLogo}
            alt="google-logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>{name} with facebook</div>
      </button>
    </>
  );
};

export default LoginWithFacebook;
