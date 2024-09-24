import axios from "axios";

export const api = axios.create({

  // baseURL: "http://127.0.0.1:5000",
  //baseURL: "https://respirar-backend.onrender.com",
  baseURL: "https://api.render.com/deploy/srv-cron05qj1k6c739km4g0?key=_DMii2mISmA"
});
