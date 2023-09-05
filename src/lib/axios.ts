import axios from "axios";

const baseURL = "https://tenetpay-backend.onrender.com";

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
