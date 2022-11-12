import Cookie from "js-cookie";

const SetCookie = (name, value, expire = 7) => {
  return Cookie.set(name, value, {
    expires: expire,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default SetCookie;

export const GetCookie = (name) => {
  return Cookie.get(name);
};
export const RemoveCookie = (name) => {
  return Cookie.remove(name);
};
