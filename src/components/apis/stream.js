import axios from "axios";

export const finvizendpoint = axios.create({
  baseURL: "http://localhost:8080",
});
