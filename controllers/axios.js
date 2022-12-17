import axios from "axios";
import { GetCookie } from "./SetCookie";

let url = process.env.URL || "http://localhost:4001";
url = "http://localhost:4001";
const auth = GetCookie("auth") || "";
const instance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Authorization: auth,
  },
});

export default instance;

export const sameSiteAxios = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Authorization: "sameSite",
  },
});
