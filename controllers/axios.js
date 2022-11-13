import axios from "axios";
import { GetCookie } from "./SetCookie";

const url = process.env.URL || "http://localhost:4001";
// const url = "http://localhost:4001";
const auth = GetCookie("auth") || "";
const instance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Authorization: auth,
  },
});

export default instance;
