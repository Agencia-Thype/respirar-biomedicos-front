import axios from "axios";

export const api = axios.create({
  baseURL: "https://respirar-back-end.onrender.com",
  // baseURL: "https://restaurante-basic-api.onrender.com",
  
});
