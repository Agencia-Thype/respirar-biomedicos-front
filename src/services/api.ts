import axios from "axios";

export const api = axios.create({

  baseURL: process.env.REACT_APP_API_URL || "https://respirar-backend.onrender.com/",

});

export const baseURL = "https://respirar-backend.onrender.com/";

