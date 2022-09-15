import React from "react";
import Link from "next/link";
import css from "./css/login.module.css";

const SignUpForm = () => {
  const label = `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`;
  const input = `appearance-none text-sm block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-teal-500 focus:bg-white`;
  const error = `text-red-500 text-xs italic`;
  return (
    <>
      <section className={css.signup__section}>
        <div className="grid grid-cols-2">
          <div className={css.info__btn}>
            <h2 className="text-3xl font-extrabold">Sign Up</h2>
            <p className="text-sm italic">{`Sign in here if you have account`}</p>
            <Link href="/login">
              <button>Sign In</button>
            </Link>
          </div>

          <div className={css.form}>
            <h1 className="text-center font-extrabold mb-4 text-3xl text-teal-700">
              Sign Up{" "}
            </h1>

            <form method="post">
              <div className="grid md:grid-cols-2">
                <div className="w-full px-3 mb-6 my-1">
                  <label className={`${label}`} htmlFor="grid-first-name">
                    First Name
                  </label>
                  <input
                    className={`${input}`}
                    id="grid-first-name"
                    type="text"
                    placeholder="First name"
                  />
                  <p className={`${error}`}>Please fill out this field.</p>
                </div>

                <div className="w-full px-3 mb-6 my-1">
                  <label className={`${label}`} htmlFor="grid-last-name">
                    Last Name
                  </label>
                  <input
                    className={`${input}`}
                    id="grid-last-name"
                    type="text"
                    placeholder="Last Name"
                  />
                  <p className={`${error}`}>Please fill out this field.</p>
                </div>
              </div>
              <div className="w-full px-3 mb-6 my-1">
                <label className={`${label}`} htmlFor="grid-phone-number">
                  Phone Number
                </label>
                <input
                  className={`${input}`}
                  id="grid-phone-number"
                  type="text"
                  placeholder="Phone Number"
                />
                <p className={`${error}`}>Please fill out this field.</p>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="w-full px-3 mb-6 my-1">
                  <label className={`${label}`} htmlFor="grid-date-of-birth">
                    Date of Birth
                  </label>
                  <input
                    className={`${input}`}
                    id="grid-date-of-birth"
                    type="date"
                  />
                  <p className={`${error}`}>Please fill out this field.</p>
                </div>

                <div className="w-full px-3 mb-6 my-1">
                  <label className={`${label}`} htmlFor="grid-date-of-birth">
                    Gender
                  </label>
                  <div className="flex flex-row gap-6 py-2">
                    <div className="flex items-center mb-4">
                      <input
                        id="male"
                        type="radio"
                        value="male"
                        name="gender"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="female"
                        type="radio"
                        value="female"
                        name="gender"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </div>

                  <p className={`${error}`}>Please fill out this field.</p>
                </div>
              </div>

              <div className="w-full px-3 mb-6 my-1">
                <label className={`${label}`} htmlFor="grid-email">
                  Email
                </label>
                <input
                  className={`${input}`}
                  id="grid-email"
                  type="text"
                  placeholder="User Email"
                />
                <p className={`${error}`}>Please fill out this field.</p>
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
                />
              </div>
              <div className="w-full px-3 py-1">
                <label className={`${label}`} htmlFor="grid-password">
                  Confirm Password
                </label>
                <input
                  className={`${input}`}
                  id="grid-password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className={css.btn__div}>
                <button>Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;
