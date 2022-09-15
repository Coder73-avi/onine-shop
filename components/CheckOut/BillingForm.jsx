import React from "react";
import css from "./css/billingform.module.css";

const BillingForm = () => {
  const labelCss = `block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`;
  const inputCss = `bg-gray-200 border outline-none border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
  return (
        <div className={css.billingForm}>
          <h1 className="font-bold py-2 uppercase text-lg ">Billing Details</h1>
          <hr className="mb-3" />

          <form>
            <div className="grid md:grid-cols-2 gap-8 mb-4">
              <div>
                <label htmlFor="first__name" className={labelCss}>
                  First name<span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="first__name"
                  name="first__name"
                  className={inputCss}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="last__name" className={labelCss}>
                  Last name<span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="last__name"
                  name="last__name"
                  className={inputCss}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="company__name" className={labelCss}>
                Company Name
              </label>
              <input
                type="text"
                id="company__name"
                name="company__name"
                className={inputCss}
                placeholder="Raeelaproduction"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className={labelCss}>
                Address<span className="error">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="street__address"
                className={inputCss + " mb-2"}
                placeholder="Street Address"
                required
              />
              <input
                type="text"
                id="address"
                name="other__address"
                className={inputCss}
                placeholder="Apartment, suite, unit etc. (optional)"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="town__city" className={labelCss}>
                Town / City<span className="error">*</span>
              </label>
              <input
                type="text"
                id="town__city"
                name="town__city"
                className={inputCss}
                placeholder="Town / City"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className={labelCss}>
                Country<span className="error">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className={inputCss}
                placeholder="Nepal"
                defaultValue={"Nepal"}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="state" className={labelCss}>
                  State <span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className={inputCss}
                  placeholder="State"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zipcode" className={labelCss}>
                  Postcode / Zip <span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  className={inputCss}
                  placeholder="PostCode / Zip"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className={labelCss}>
                  Email Address <span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={inputCss}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className={labelCss}>
                  Phone Number <span className="error">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className={inputCss}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
          </form>
        </div>
  );
};

export default BillingForm;
