import React, { useState, useEffect } from "react";
import css from "./css/login.module.css";
import Link from "next/link";
import axios from "controllers/axios";

import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const [{}, dispatch] = useStateValue();
  const label = `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`;
  const input = `appearance-none text-sm block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-teal-500 focus:bg-white`;
  const error = `text-red-500 text-xs italic`;
  const [errorMsg, setErrorMsg] = useState("Please fill out this field.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const obj = { email, password };
      const res = await axios.post("/login", obj);
      if (res.status == 200) {
        setErrorMsg("Login Successfully");

        const getUser = await axios.get("/getuser");
        if (getUser.status == 200) {
          if (Array.isArray(getUser?.data)) {
            dispatch({ type: "AUTH__USER", user: getUser.data[0] });
          } else {
            dispatch({ type: "AUTH__USER", user: null });
          }
        }
        router.push("/myaccount");
      }
    } catch (error) {
      console.error(error.response?.data);
      setErrorMsg(error.response?.data?.message);
    }
  };

  return (
    <>
      <section className={css.login__section}>
        <div className="grid grid-cols-2">
          <div className={css.form}>
            <h1 className="text-center font-extrabold mb-4 text-3xl text-teal-700">
              Login
            </h1>
            <div className={css.socialLogin}>
              <div>
                <RiFacebookFill />
              </div>
              <div>
                <AiOutlineGooglePlus />
              </div>
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
                <button type="submit">Sign In</button>
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
