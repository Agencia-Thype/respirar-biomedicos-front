import axios from "axios";

export const api = axios.create({
 baseURL: "https://respirar-backend.onrender.com"
//baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:5000",
});
