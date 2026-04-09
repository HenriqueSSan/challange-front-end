import axios from "axios"
import type { HttpRequest } from "./http.interface"

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
})

export async function http(request: HttpRequest) {
  if (!request.method) request.method = "get"
  if (request.method === "del") request.method = "delete"

  return await axiosIns.request({
    url: request.url,
    data: request.body,
    method: request.method,
    params: request.params,
    headers: request.headers,
    ...(request?.status
      ? { validateStatus: (status) => (request?.status ? request.status.includes(status) : false) }
      : {}),
  })
}
