import Breadcrumbs from "components/Breadcrumbs";
import SliderBox from "components/SliderBox";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function Test() {
  // const [profile, setProfile] = useState([]);
  // const clientId =
  //   "434554521621-6smtnnqahblegv3oq2pd83ertbl92ktc.apps.googleusercontent.com";
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   };
  //   gapi.load("client:auth2", initClient);
  // });

  // const onSuccess = (res) => {
  //   setProfile(res.profileObj);
  // };

  // const onFailure = (err) => {
  //   console.log("failed", err);
  // };

  // const logOut = () => {
  //   setProfile(null);
  // };
  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[{ name: "Shoping Cart", path: "/shoppingcart" }]}
        />
        <section className="border w-[90%] mx-auto my-4 overflow-hidden"></section>
      </main>
    </>
  );
}
