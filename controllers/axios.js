import axios from "axios";

const url = process.env.URL || "http://localhost:4001";
const instance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default instance;
