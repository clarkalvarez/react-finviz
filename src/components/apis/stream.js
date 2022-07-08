import axios from "axios";

export const finvizendpoint = axios.create({
  baseURL: "http://localhost:4000",
});

export const stocksdb = axios.create({
  baseURL: "http://localhost:3001",
});
