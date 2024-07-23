import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.API_ENDPOINT,
  responseType: 'json',
  headers: {
    "Content-type": "application/json"
  }
});
