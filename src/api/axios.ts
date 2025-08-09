import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.com/api", // تغییر بده
  timeout: 15000,
});

// مثال استفاده:
/*
import { api } from "@/api/axios";

async function fetchUsers() {
  const res = await api.get("/users");
  return res.data;
}
*/

