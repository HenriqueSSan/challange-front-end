import type { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from "axios"

export type HttpRequest = {
  url: string
  body?: unknown
  method?: "get" | "post" | "put" | "delete" | "del" | "patch"
  params?: Record<string, unknown>
  headers?: AxiosHeaders | Partial<RawAxiosRequestHeaders>
  status?: number[]
}

export type HttpResponse<R = unknown> = AxiosResponse<R>