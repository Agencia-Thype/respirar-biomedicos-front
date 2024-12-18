import axios from "axios";

export const api = axios.create({

  baseURL:  "http://localhost:3000/"
  //|| "https://respirar-backend.onrender.com/",

});

//export const baseURL = "https://respirar-backend.onrender.com/";
export const baseURL =  "http://localhost:3000/";

