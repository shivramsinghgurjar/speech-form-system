import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const extractKeywords = (text) =>
  API.post("/speech/extract", { text });

export const saveForm = (data) =>
  API.post("/form", data);