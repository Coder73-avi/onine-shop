import React, { useState, useEffect, useRef } from "react";
import css from "./css/login.module.css";
import Link from "next/link";
import axios from "controllers/axios";

import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";
import SetCookie, { GetCookie } from "controllers/SetCookie";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithFacebook from "./LoginWithFacebook";
import Loading from "components/Loading";
import PopMessage from "components/Loading/PopMessage";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();
  const [{}, dispatch] = useStateValue();
  const label = `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`;
  const input = `appearance-none text-sm block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-teal-500 focus:bg-white`;
  const error = `text-red-500 text-xs italic`;
  const [errorMsg, setErrorMsg] = useState("Please fill out this field.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const obj = { email, password };
      const res = await axios.post("/login", obj);
      if (res.status == 200) {
        setErrorMsg("Login Successfully");
        SetCookie("auth", res.data?.token);
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        return setTimeout(() => window.location.reload(false), 1500);
      }
    } catch (error) {
      console.error(error.response?.data);
      setErrorMsg(error.response?.data?.message);
    }
  };

  return (
    <>
      {/* {<PopMessage />} */}
      {/* {loading ? (
        <div className="top-0 left-0 fixed border w-[100%] h-[100%] bg-red-500 z-50">
          <Loading />
        </div>
      ) : null} */}
      <section className={css.login__section}>
        <div className="grid md:grid-cols-2">
          <div className={css.form}>
            <h1 className="text-center font-extrabold mb-4 text-3xl text-teal-700">
              Login
            </h1>
            <div className="grid md:grid-cols-2 place-items-center gap-4">
              <LoginWithGoogle setLoading={setLoading} />
              <LoginWithFacebook />
            </div>

            <form method="post" onSubmit={submitLogin}>
              <div className="w-full px-3 mb-6 my-1">
                <label className={`${label}`} htmlFor="grid-email">
                  Email
                </label>
                <input
                  className={`${input}`}
                  id="grid-email"
                  type="text"
                  placeholder="User Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className={`${error}`}>{errorMsg}</p>
              </div>
              <div className="w-full px-3 py-1">
                <label className={`${label}`} htmlFor="grid-password">
                  Password
                </label>
                <input
                  className={`${input}`}
                  id="grid-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-center text-sm">Forget your password?</p>
              <div className={css.btn__div}>
                <button type="submit">Login In</button>
              </div>
            </form>
          </div>

          <div className={css.info__btn}>
            <h2 className="text-3xl font-extrabold">Sign Up</h2>
            <p className="text-sm italic">{`Sign Up here if you don't have account`}</p>
            <Link href="/login?type=signup">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
