import axios from "axios";

export const api = axios.create({

   baseURL: "http://127.0.0.1:50000",
  //baseURL: "https://respirar-backend.onrender.com",

});
