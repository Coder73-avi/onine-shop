import { useEffect } from "react";
import Aos from "aos";
import "styles/globalfonts.css";
import "styles/globalcolors.css";
import "styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { ToastContainer } from "react-toastify";

import Navigation from "components/Navigation";
import { StateProvider } from "controllers/Reducer/stateProvider";
import reducer, { initialState } from "controllers/Reducer/reducer";
import NextNProgress from "nextjs-progressbar";
import Footer from "components/Footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathArr = ["/myaccount", "/login"];
  // require("dotenv").config();
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <NextNProgress options={{ showSpinner: false }} color="#087960" />
        <Navigation />
        <Component {...pageProps} />

        {!pathArr.includes(router.pathname) ? <Footer /> : null}
      </StateProvider>
    </>
  );
}

export default MyApp;
