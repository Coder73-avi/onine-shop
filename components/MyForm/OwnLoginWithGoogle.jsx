import React, { useRef } from "react";
import { useScript } from "components/Hooks/useScript";
import { GoogleLogin } from "@react-oauth/google";

const CLIENT_ID =
  "434554521621-6smtnnqahblegv3oq2pd83ertbl92ktc.apps.googleusercontent.com";

const LoginWithGoogle = () => {
  const googleBtn = useRef();

  const onSuccess = (response) => {
    console.log(response);
  };

  useScript(
    "https://accounts.google.com/gsi/client",
    () => {
      // globle google
      window.google.accounts?.id.initialize({
        client_id: CLIENT_ID,
        callback: onSuccess,
        // auto_select: true,
      });
      // setClientToken(req);
      window.google.accounts?.id.renderButton(googleBtn.current, {
        theme: "outline",
        size: "large",
      });

      window.google.accounts?.id.prompt();
    },
    [],
  );
  return (
    <>
      <div ref={googleBtn}>Google</div>
    </>
  );
};

export default LoginWithGoogle;
