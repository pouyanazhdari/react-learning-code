import axios from "axios";

const jpAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Authorization: "Bearer 3j4bkg45lkh32g5jg3l5jhv34lj5hv43l5h",
    "Content-Type": "application/json"
  }
});

export default jpAxios;
