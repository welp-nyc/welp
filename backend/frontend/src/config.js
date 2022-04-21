import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://welp.nyc/api/"
})