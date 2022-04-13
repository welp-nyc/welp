import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://welp-nyc.herokuapp.com/api/"
})