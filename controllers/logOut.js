import { RemoveCookie } from "./SetCookie";

const logOut = async () => {
  try {
    RemoveCookie("auth");
    alert("Log out successfully");
    return window.location.href(false);
  } catch (error) {
    return console.error(error);
  }
};

export default logOut;
