import { stocksdb, finvizendpoint } from "../apis/stream";
import {
  GET_NEWS,
  GET_STOCKS,
  POST_NEWS,
  POST_STOCK,
  GET_SAVE_STOCK,
  GET_ONE_NEWS,
} from "./types";

export const getNews = (data) => {
  return {
    type: GET_NEWS,
    payload: data,
  };
};

export const getOneNews = (data) => {
  return {
    type: GET_ONE_NEWS,
    payload: data,
  };
};

export const getStock = (data) => {
  return {
    type: GET_SAVE_STOCK,
    payload: data,
  };
};

export const postNews = (data) => {
  return {
    type: POST_NEWS,
    payload: data,
  };
};

export const postStock = (data) => {
  return {
    type: POST_STOCK,
    payload: data,
  };
};

export const fetchStock = (stockcode) => async (dispatch) => {
  const response = await finvizendpoint.get(
    `/stockInfo?stockCode=${stockcode}`
  );
  const responseData = response.data;
  dispatch({ type: GET_SAVE_STOCK, payload: response.data });
  await stocksdb.post("/stocks", responseData);
};

export const fetchStocks = () => async (dispatch) => {
  const response = await stocksdb.get("/stocks");
  console.log("response");
  console.log(response);

  dispatch({ type: GET_STOCKS, payload: response.data });
};

export const fetchOneNews = (stockCode) => async (dispatch) => {
  const response = await stocksdb.get("/news");

  dispatch({ type: GET_ONE_NEWS, payload: response.data });
};

export const fetchNews = (stockcode) => async (dispatch) => {
  const response = await finvizendpoint.get(
    `/stockInfo?stockCode=${stockcode}`
  );
  const responseData = response.data;

  dispatch({ type: GET_NEWS, payload: responseData });
  await stocksdb.post("/news", responseData);
};

export const storeNews = (newsValues) => async (dispatch) => {
  const response = await stocksdb.post("/news", { newsValues });

  dispatch({ type: POST_NEWS, payload: response.data });
};

export const storeStock = (stockValues) => async (dispatch) => {
  const response = await stocksdb.post("/stocks", { stockValues });

  dispatch({ type: POST_STOCK, payload: response.data });
};
