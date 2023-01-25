import React, { useEffect, useRef, useState } from "react";
import { useScript } from "components/Hooks/useScript";
import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import css from "./css/button.module.css";

import googleLogo from "images/google-icon.svg";
import Image from "next/image";
import axios from "controllers/axios";
import Axios from "axios";
import SetCookie from "controllers/SetCookie";
import Swal from "sweetalert2";

const LoginWithGoogle = ({ name = "Login", setLoading }) => {
  const SendData = async (data) => {
    try {
      const { access_token } = data;
      // console.log(data);

      const result = await Axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      if (result.status == 200) {
        setLoading(true);
        const { sub, given_name, family_name, email } = result.data;
        const newObj = {
          firstname: given_name,
          lastname: family_name,
          email,
          social_id: sub,
        };
        const req = await axios.post("/loginwithsocail/google", newObj);
        if (req.status == 200 || req.status == 201) {
          SetCookie("auth", req.data?.token);

          setLoading(false);
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          return setTimeout(() => window.location.reload(false), 1500);
        }
        // console.log("out >>",);
      }
      // console.log(result);
    } catch (error) {
      return console.error(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (responseToken) => SendData(responseToken),
    onError: (response) => console.error(response),
  });

  return (
    <>
      <button
        onClick={login}
        className={
          "border flex flex-row items-center gap-2 text-xs font-bold p-3 w-full text-gray-700 rounded-md hover:shadow hover:opacity-80"
        }
      >
        <div className="relative h-5 w-5">
          <Image
            src={googleLogo}
            alt="google-logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>{name} with Google</div>
      </button>
    </>
  );
};

export default LoginWithGoogle;
